// contracts/service-interfaces.ts

import { VocabularyPair, LeitnerState, TagStats } from '../data-model';

/**
 * Service Contract for Data Persistence
 * This allows swapping LocalStorage for a remote API later.
 */
export interface IVocabularyRepository {
  // Vocabulary Operations
  addVocabulary(pairs: Omit<VocabularyPair, 'id' | 'createdAt'>[]): Promise<VocabularyPair[]>;
  getAllVocabulary(): Promise<VocabularyPair[]>;
  getVocabularyById(id: string): Promise<VocabularyPair | null>;
  deleteVocabulary(id: string): Promise<void>;

  // Tag Operations
  getTags(): Promise<string[]>;

  // Leitner Operations
  getLeitnerState(
    vocabId: string,
    direction: 'DE_TO_CZ' | 'CZ_TO_DE'
  ): Promise<LeitnerState | null>;
  updateLeitnerState(state: LeitnerState): Promise<void>;
  getDueReviews(
    now: Date
  ): Promise<{ vocab: VocabularyPair; direction: 'DE_TO_CZ' | 'CZ_TO_DE' }[]>;

  // Stats
  getStats(): Promise<TagStats[]>;
}

/**
 * Service Contract for AI Operations
 */
export interface IAIService {
  generateVocabulary(
    theme: string,
    difficulty: string,
    count: number,
    apiKey: string
  ): Promise<Omit<VocabularyPair, 'id' | 'createdAt'>[]>;
}
