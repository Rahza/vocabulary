import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    query,
    where,
    writeBatch,
} from 'firebase/firestore';
import { getFirebaseDb, getFirebaseAuth } from '@/lib/firebase';
import { VocabularyPair, LeitnerState, TagStats, GlobalStats } from '@/models/types';
import { IVocabularyRepository } from './IVocabularyRepository';
import { LanguageDirection, DIRECTION_FORWARD, DIRECTION_BACKWARD } from '@/constants/languages';

const getDb = () => {
    const db = getFirebaseDb();
    if (!db) {
        throw new Error('Firebase is not configured');
    }
    return db;
};

const getUserId = (): string => {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) {
        throw new Error('User must be authenticated to access vocabulary data');
    }
    return user.uid;
};

const getVocabCollectionRef = () => {
    return collection(getDb(), 'users', getUserId(), 'vocabulary');
};

const getLeitnerCollectionRef = () => {
    return collection(getDb(), 'users', getUserId(), 'leitner');
};

export class FirebaseRepository implements IVocabularyRepository {
    async addVocabulary(
        pairs: Omit<VocabularyPair, 'id' | 'createdAt'>[]
    ): Promise<VocabularyPair[]> {
        const userId = getUserId();
        const batch = writeBatch(getDb());
        const newPairs: VocabularyPair[] = [];

        pairs.forEach((p) => {
            const id = crypto.randomUUID();
            const createdAt = new Date().toISOString();
            const vocabDoc: VocabularyPair = {
                ...p,
                id,
                createdAt,
                ownerId: userId,
            };

            newPairs.push(vocabDoc);
            const vocabRef = doc(getDb(), 'users', userId, 'vocabulary', id);
            batch.set(vocabRef, vocabDoc);

            // Initialize Leitner state for both directions
            ([DIRECTION_FORWARD, DIRECTION_BACKWARD] as const).forEach((direction) => {
                const leitnerId = `${id}_${direction}`;
                const leitnerState: LeitnerState = {
                    vocabId: id,
                    direction,
                    box: 1,
                    lastReviewed: createdAt,
                    nextReview: createdAt,
                    history: [],
                    ownerId: userId,
                };
                const leitnerRef = doc(getDb(), 'users', userId, 'leitner', leitnerId);
                batch.set(leitnerRef, leitnerState);
            });
        });

        await batch.commit();
        return newPairs;
    }

    async getAllVocabulary(): Promise<VocabularyPair[]> {
        const snapshot = await getDocs(getVocabCollectionRef());
        return snapshot.docs.map((d) => d.data() as VocabularyPair);
    }

    async getVocabularyById(id: string): Promise<VocabularyPair | null> {
        const docRef = doc(getVocabCollectionRef(), id);
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? (snapshot.data() as VocabularyPair) : null;
    }

    async deleteVocabulary(id: string): Promise<void> {
        const userId = getUserId();
        const batch = writeBatch(getDb());

        batch.delete(doc(getDb(), 'users', userId, 'vocabulary', id));
        batch.delete(doc(getDb(), 'users', userId, 'leitner', `${id}_${DIRECTION_FORWARD}`));
        batch.delete(doc(getDb(), 'users', userId, 'leitner', `${id}_${DIRECTION_BACKWARD}`));

        await batch.commit();
    }

    async getVocabularyByTag(tag: string): Promise<VocabularyPair[]> {
        const q = query(getVocabCollectionRef(), where('tags', 'array-contains', tag));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((d) => d.data() as VocabularyPair);
    }

    async getTags(): Promise<string[]> {
        const allVocab = await this.getAllVocabulary();
        const tags = new Set<string>();
        allVocab.forEach((v) => v.tags.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
    }

    async getLeitnerState(
        vocabId: string,
        direction: LanguageDirection
    ): Promise<LeitnerState | null> {
        const leitnerId = `${vocabId}_${direction}`;
        const docRef = doc(getLeitnerCollectionRef(), leitnerId);
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? (snapshot.data() as LeitnerState) : null;
    }

    async getAllLeitnerStates(): Promise<LeitnerState[]> {
        const snapshot = await getDocs(getLeitnerCollectionRef());
        return snapshot.docs.map((d) => d.data() as LeitnerState);
    }

    async updateLeitnerState(state: LeitnerState): Promise<void> {
        const userId = getUserId();
        const leitnerId = `${state.vocabId}_${state.direction}`;
        const docRef = doc(getDb(), 'users', userId, 'leitner', leitnerId);
        await setDoc(docRef, { ...state, ownerId: userId });
    }

    async getDueReviews(
        now: Date
    ): Promise<{ vocab: VocabularyPair; direction: LanguageDirection }[]> {
        const allVocab = await this.getAllVocabulary();
        const allLeitner = await this.getAllLeitnerStates();
        const nowISO = now.toISOString();

        const dueStates = allLeitner.filter((l) => l.nextReview <= nowISO);
        const vocabMap = new Map(allVocab.map((v) => [v.id, v]));

        const results: { vocab: VocabularyPair; direction: LanguageDirection }[] = [];

        for (const state of dueStates) {
            const vocab = vocabMap.get(state.vocabId);
            if (vocab) {
                results.push({ vocab, direction: state.direction });
            }
        }

        return results;
    }

    async getGlobalStats(): Promise<GlobalStats> {
        const allVocab = await this.getAllVocabulary();
        const allLeitner = await this.getAllLeitnerStates();

        const totalWords = allVocab.length;
        let masteredCount = 0;
        const boxDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        allVocab.forEach((v) => {
            const states = allLeitner.filter((l) => l.vocabId === v.id);
            const forwardState = states.find((l) => l.direction === DIRECTION_FORWARD);
            const backwardState = states.find((l) => l.direction === DIRECTION_BACKWARD);

            const forwardBox = forwardState?.box || 1;
            const backwardBox = backwardState?.box || 1;

            const minBox = Math.min(forwardBox, backwardBox) as 1 | 2 | 3 | 4 | 5;
            boxDistribution[minBox]++;

            if (forwardBox === 5 && backwardBox === 5) {
                masteredCount++;
            }
        });

        return {
            totalWords,
            masteredWords: masteredCount,
            boxDistribution,
        };
    }

    async getStats(): Promise<TagStats[]> {
        const allVocab = await this.getAllVocabulary();
        const allLeitner = await this.getAllLeitnerStates();
        const tags = await this.getTags();

        return tags.map((tag) => {
            const vocabForTag = allVocab.filter((v) => v.tags.includes(tag));

            const totalWords = vocabForTag.length;
            let masteredCount = 0;
            let learningCount = 0;
            const boxDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

            vocabForTag.forEach((v) => {
                const states = allLeitner.filter((l) => l.vocabId === v.id);
                const forwardState = states.find((l) => l.direction === DIRECTION_FORWARD);
                const backwardState = states.find((l) => l.direction === DIRECTION_BACKWARD);

                const forwardBox = forwardState?.box || 1;
                const backwardBox = backwardState?.box || 1;

                const minBox = Math.min(forwardBox, backwardBox) as 1 | 2 | 3 | 4 | 5;
                boxDistribution[minBox]++;

                if (forwardBox === 5 && backwardBox === 5) {
                    masteredCount++;
                } else {
                    learningCount++;
                }
            });

            return {
                tagName: tag,
                totalWords,
                masteredWords: masteredCount,
                learningWords: learningCount,
                boxDistribution,
            };
        });
    }

    async exists(term: string): Promise<boolean> {
        const allVocab = await this.getAllVocabulary();
        const normalizedTerm = term.trim().toLowerCase();
        return allVocab.some((v) => v.source.trim().toLowerCase() === normalizedTerm);
    }

    async resetProgress(id: string): Promise<void> {
        const userId = getUserId();
        const now = new Date().toISOString();
        const batch = writeBatch(getDb());

        ([DIRECTION_FORWARD, DIRECTION_BACKWARD] as const).forEach((direction) => {
            const leitnerId = `${id}_${direction}`;
            const docRef = doc(getDb(), 'users', userId, 'leitner', leitnerId);

            batch.set(
                docRef,
                {
                    box: 1,
                    lastReviewed: now,
                    nextReview: now,
                    history: [],
                },
                { merge: true }
            );
        });

        await batch.commit();
    }

    async bulkDelete(ids: string[]): Promise<void> {
        const userId = getUserId();
        const batch = writeBatch(getDb());

        ids.forEach((id) => {
            batch.delete(doc(getDb(), 'users', userId, 'vocabulary', id));
            batch.delete(doc(getDb(), 'users', userId, 'leitner', `${id}_${DIRECTION_FORWARD}`));
            batch.delete(doc(getDb(), 'users', userId, 'leitner', `${id}_${DIRECTION_BACKWARD}`));
        });

        await batch.commit();
    }

    async bulkAddTag(ids: string[], tag: string): Promise<void> {
        const userId = getUserId();
        const batch = writeBatch(getDb());

        for (const id of ids) {
            const vocab = await this.getVocabularyById(id);
            if (vocab && !vocab.tags.includes(tag)) {
                batch.set(
                    doc(getDb(), 'users', userId, 'vocabulary', id),
                    { tags: [...vocab.tags, tag] },
                    { merge: true }
                );
            }
        }

        await batch.commit();
    }

    async bulkRemoveTag(ids: string[], tag: string): Promise<void> {
        const userId = getUserId();
        const batch = writeBatch(getDb());

        for (const id of ids) {
            const vocab = await this.getVocabularyById(id);
            if (vocab) {
                batch.set(
                    doc(getDb(), 'users', userId, 'vocabulary', id),
                    { tags: vocab.tags.filter((t) => t !== tag) },
                    { merge: true }
                );
            }
        }

        await batch.commit();
    }

    async deleteTagGlobal(tagName: string): Promise<void> {
        const vocabWithTag = await this.getVocabularyByTag(tagName);
        const userId = getUserId();
        const batch = writeBatch(getDb());

        vocabWithTag.forEach((v) => {
            batch.set(
                doc(getDb(), 'users', userId, 'vocabulary', v.id),
                { tags: v.tags.filter((t) => t !== tagName) },
                { merge: true }
            );
        });

        await batch.commit();
    }

    async renameTagGlobal(oldName: string, newName: string): Promise<void> {
        const vocabWithTag = await this.getVocabularyByTag(oldName);
        const userId = getUserId();
        const batch = writeBatch(getDb());

        vocabWithTag.forEach((v) => {
            const newTags = Array.from(new Set(v.tags.map((t) => (t === oldName ? newName : t))));
            batch.set(doc(getDb(), 'users', userId, 'vocabulary', v.id), { tags: newTags }, { merge: true });
        });

        await batch.commit();
    }

    async updateVocabulary(id: string, updates: Partial<VocabularyPair>): Promise<void> {
        const userId = getUserId();
        const docRef = doc(getDb(), 'users', userId, 'vocabulary', id);
        await setDoc(docRef, updates, { merge: true });
    }
}
