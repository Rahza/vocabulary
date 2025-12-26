export interface IVocabularyRepository {
  getAll(): Promise<VocabularyItem[]>;
  add(item: Omit<VocabularyItem, 'id' | 'createdAt'>): Promise<VocabularyItem>;
  delete(id: string): Promise<void>;
  update(item: VocabularyItem): Promise<VocabularyItem>;
  exists(term: string): Promise<boolean>; // New requirement
}

export interface IVocabularyGenerator {
  generate(
    topic: string,
    count: number,
    existingTerms: string[]
  ): Promise<GeneratedVocabularyItem[]>;
}

export interface GeneratedVocabularyItem {
  term: string;
  translation: string;
  mnemonic: string;
  tags: string[];
}
