import { VocabularyPair, LeitnerState, TagStats, GlobalStats } from "@/models/types";
import { LanguageDirection } from "@/constants/languages";

export interface IVocabularyRepository {
  // Vocabulary Operations
  addVocabulary(pairs: Omit<VocabularyPair, 'id' | 'createdAt'>[]): Promise<VocabularyPair[]>;
  getAllVocabulary(): Promise<VocabularyPair[]>;
  getVocabularyById(id: string): Promise<VocabularyPair | null>;
  deleteVocabulary(id: string): Promise<void>;
  getVocabularyByTag(tag: string): Promise<VocabularyPair[]>;
  
  // Tag Operations
  getTags(): Promise<string[]>;
  
  // Leitner Operations
  getLeitnerState(vocabId: string, direction: LanguageDirection): Promise<LeitnerState | null>;
  getAllLeitnerStates(): Promise<LeitnerState[]>;
  updateLeitnerState(state: LeitnerState): Promise<void>;
  getDueReviews(now: Date): Promise<{ vocab: VocabularyPair, direction: LanguageDirection }[]>;
  
  // Stats
  getStats(): Promise<TagStats[]>;
  getGlobalStats(): Promise<GlobalStats>;

  // Check
  exists(term: string): Promise<boolean>;

  // Management Operations
  resetProgress(id: string): Promise<void>;
  bulkDelete(ids: string[]): Promise<void>;
  bulkAddTag(ids: string[], tag: string): Promise<void>;
  bulkRemoveTag(ids: string[], tag: string): Promise<void>;
  deleteTagGlobal(tagName: string): Promise<void>;
  renameTagGlobal(oldName: string, newName: string): Promise<void>;
  updateVocabulary(id: string, updates: Partial<VocabularyPair>): Promise<void>;
}