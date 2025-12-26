import { VocabularyPair, LeitnerState, LanguageDirection } from '@/models/types';

export interface IVocabularyRepository {
  // CRUD
  addVocabulary(pairs: Omit<VocabularyPair, 'id' | 'createdAt'>[]): Promise<VocabularyPair[]>;
  getAllVocabulary(): Promise<VocabularyPair[]>;
  getVocabularyById(id: string): Promise<VocabularyPair | null>;
  deleteVocabulary(id: string): Promise<void>;
  updateVocabulary(id: string, updates: Partial<VocabularyPair>): Promise<void>;

  // Tags
  getVocabularyByTag(tag: string): Promise<VocabularyPair[]>;
  getTags(): Promise<string[]>;

  // Leitner System
  getLeitnerState(vocabId: string, direction: LanguageDirection): Promise<LeitnerState | null>;
  getAllLeitnerStates(): Promise<LeitnerState[]>;
  updateLeitnerState(state: LeitnerState): Promise<void>;
  getDueReviews(now: Date): Promise<{ vocab: VocabularyPair; direction: LanguageDirection }[]>;

  // Stats
  getStats(): Promise<any>; // Type to be updated in models
  getGlobalStats(): Promise<any>; // Type to be updated in models

  // Utils
  exists(term: string): Promise<boolean>;
  resetProgress(id: string): Promise<void>;
}
