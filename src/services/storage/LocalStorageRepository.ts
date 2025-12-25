import { VocabularyPair, LeitnerState, TagStats, GlobalStats } from "@/models/types";
import { IVocabularyRepository } from "./IVocabularyRepository";

const STORAGE_KEYS = {
  VOCAB: "ai_vocab_data",
  LEITNER: "ai_vocab_leitner",
};

export class LocalStorageRepository implements IVocabularyRepository {
  private getVocabData(): VocabularyPair[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.VOCAB);
    return data ? JSON.parse(data) : [];
  }

  private saveVocabData(data: VocabularyPair[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(data));
  }

  private getLeitnerData(): LeitnerState[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.LEITNER);
    return data ? JSON.parse(data) : [];
  }

  private saveLeitnerData(data: LeitnerState[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.LEITNER, JSON.stringify(data));
  }

  async addVocabulary(pairs: Omit<VocabularyPair, "id" | "createdAt">[]): Promise<VocabularyPair[]> {
    const current = this.getVocabData();
    const newPairs: VocabularyPair[] = pairs.map((p) => ({
      ...p,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }));
    
    // Initialize Leitner state for new pairs (both directions)
    const leitnerStates = this.getLeitnerData();
    const newLeitnerStates: LeitnerState[] = [];
    
    newPairs.forEach(p => {
      (['DE_TO_CZ', 'CZ_TO_DE'] as const).forEach(direction => {
        newLeitnerStates.push({
          vocabId: p.id,
          direction,
          box: 1,
          lastReviewed: new Date().toISOString(), // technically not reviewed but "created"
          nextReview: new Date().toISOString(), // due immediately
          history: []
        });
      });
    });

    this.saveVocabData([...current, ...newPairs]);
    this.saveLeitnerData([...leitnerStates, ...newLeitnerStates]);
    
    return newPairs;
  }

  async getAllVocabulary(): Promise<VocabularyPair[]> {
    return this.getVocabData();
  }

  async getVocabularyById(id: string): Promise<VocabularyPair | null> {
    const all = this.getVocabData();
    return all.find((v) => v.id === id) || null;
  }

  async deleteVocabulary(id: string): Promise<void> {
    const all = this.getVocabData();
    this.saveVocabData(all.filter((v) => v.id !== id));
    
    // Also delete associated Leitner states
    const leitner = this.getLeitnerData();
    this.saveLeitnerData(leitner.filter(l => l.vocabId !== id));
  }

  async getVocabularyByTag(tag: string): Promise<VocabularyPair[]> {
    const all = this.getVocabData();
    return all.filter((v) => v.tags.includes(tag));
  }

  async getTags(): Promise<string[]> {
    const all = this.getVocabData();
    const tags = new Set<string>();
    all.forEach((v) => v.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }

  async getLeitnerState(vocabId: string, direction: "DE_TO_CZ" | "CZ_TO_DE"): Promise<LeitnerState | null> {
    const all = this.getLeitnerData();
    return all.find((l) => l.vocabId === vocabId && l.direction === direction) || null;
  }

  async getAllLeitnerStates(): Promise<LeitnerState[]> {
    return this.getLeitnerData();
  }

  async updateLeitnerState(state: LeitnerState): Promise<void> {
    const all = this.getLeitnerData();
    const index = all.findIndex((l) => l.vocabId === state.vocabId && l.direction === state.direction);
    
    if (index >= 0) {
      all[index] = state;
    } else {
      all.push(state);
    }
    this.saveLeitnerData(all);
  }

  async getDueReviews(now: Date): Promise<{ vocab: VocabularyPair; direction: "DE_TO_CZ" | "CZ_TO_DE" }[]> {
    const allVocab = this.getVocabData();
    const allLeitner = this.getLeitnerData();
    const nowISO = now.toISOString();

    const dueStates = allLeitner.filter(l => l.nextReview <= nowISO);
    
    const results: { vocab: VocabularyPair; direction: "DE_TO_CZ" | "CZ_TO_DE" }[] = [];
    
    for (const state of dueStates) {
      const vocab = allVocab.find(v => v.id === state.vocabId);
      if (vocab) {
        results.push({ vocab, direction: state.direction });
      }
    }
    
    return results;
  }

  async getGlobalStats(): Promise<GlobalStats> {
    const allVocab = this.getVocabData();
    const allLeitner = this.getLeitnerData();
    
    const totalWords = allVocab.length;
    let masteredCount = 0;
    const boxDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    allVocab.forEach(v => {
      const states = allLeitner.filter(l => l.vocabId === v.id);
      const deToCz = states.find(l => l.direction === 'DE_TO_CZ');
      const czToDe = states.find(l => l.direction === 'CZ_TO_DE');
      
      const deBox = deToCz?.box || 1;
      const czBox = czToDe?.box || 1;
      
      const minBox = Math.min(deBox, czBox) as 1 | 2 | 3 | 4 | 5;
      boxDistribution[minBox]++;

      if (deBox === 5 && czBox === 5) {
        masteredCount++;
      }
    });

    return {
      totalWords,
      masteredWords: masteredCount,
      boxDistribution
    };
  }

  async getStats(): Promise<TagStats[]> {
    const allVocab = this.getVocabData();
    const allLeitner = this.getLeitnerData();
    const tags = await this.getTags();
    
    return tags.map(tag => {
      const vocabForTag = allVocab.filter(v => v.tags.includes(tag));
      // const ids = new Set(vocabForTag.map(v => v.id));
      
      const totalWords = vocabForTag.length;
      // In stats, we usually count "items to learn". Since each word has 2 directions, 
      // we could count "learning items" (words * 2) or just words. 
      // Let's count words, and consider "mastered" if BOTH directions are Box 5?
      // Or simplify: just sum up the states.
      // Let's stick to simple "Word" based stats for now, or maybe direction based?
      // The interface says "masteredWords". Let's say a word is mastered if both directions are Box 5.
      
      let masteredCount = 0;
      let learningCount = 0; // Box 1-4 (any direction)
      const boxDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      
      vocabForTag.forEach(v => {
        const states = allLeitner.filter(l => l.vocabId === v.id);
        const deToCz = states.find(l => l.direction === 'DE_TO_CZ');
        const czToDe = states.find(l => l.direction === 'CZ_TO_DE');
        
        const deBox = deToCz?.box || 1;
        const czBox = czToDe?.box || 1;
        
        const minBox = Math.min(deBox, czBox) as 1 | 2 | 3 | 4 | 5;
        boxDistribution[minBox]++;

        if (deBox === 5 && czBox === 5) {
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
        boxDistribution
      };
    });
  }

  async exists(term: string): Promise<boolean> {
    const all = this.getVocabData();
    const normalizedTerm = term.trim().toLowerCase();
    return all.some(v => v.german.trim().toLowerCase() === normalizedTerm);
  }

  async resetProgress(id: string): Promise<void> {
    const leitner = this.getLeitnerData();
    const now = new Date().toISOString();
    const updated = leitner.map(l => {
      if (l.vocabId === id) {
        return {
          ...l,
          box: 1,
          lastReviewed: now,
          nextReview: now,
          history: []
        } as LeitnerState;
      }
      return l;
    });
    this.saveLeitnerData(updated);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const vocab = this.getVocabData();
    const leitner = this.getLeitnerData();
    const idSet = new Set(ids);

    this.saveVocabData(vocab.filter(v => !idSet.has(v.id)));
    this.saveLeitnerData(leitner.filter(l => !idSet.has(l.vocabId)));
  }

  async bulkAddTag(ids: string[], tag: string): Promise<void> {
    const vocab = this.getVocabData();
    const idSet = new Set(ids);
    const updated = vocab.map(v => {
      if (idSet.has(v.id) && !v.tags.includes(tag)) {
        return { ...v, tags: [...v.tags, tag] };
      }
      return v;
    });
    this.saveVocabData(updated);
  }

  async bulkRemoveTag(ids: string[], tag: string): Promise<void> {
    const vocab = this.getVocabData();
    const idSet = new Set(ids);
    const updated = vocab.map(v => {
      if (idSet.has(v.id)) {
        return { ...v, tags: v.tags.filter(t => t !== tag) };
      }
      return v;
    });
    this.saveVocabData(updated);
  }

  async deleteTagGlobal(tagName: string): Promise<void> {
    const vocab = this.getVocabData();
    const updated = vocab.map(v => ({
      ...v,
      tags: v.tags.filter(t => t !== tagName)
    }));
    this.saveVocabData(updated);
  }

  async renameTagGlobal(oldName: string, newName: string): Promise<void> {
    const vocab = this.getVocabData();
    const updated = vocab.map(v => {
      if (v.tags.includes(oldName)) {
        // Replace oldName with newName and deduplicate using Set
        const newTags = Array.from(new Set(v.tags.map(t => t === oldName ? newName : t)));
        return { ...v, tags: newTags };
      }
      return v;
    });
    this.saveVocabData(updated);
  }

  async updateVocabulary(id: string, updates: Partial<VocabularyPair>): Promise<void> {
    const vocab = this.getVocabData();
    const updated = vocab.map(v => {
      if (v.id === id) {
        return { ...v, ...updates };
      }
      return v;
    });
    this.saveVocabData(updated);
  }
}
