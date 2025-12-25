export interface GeneratedVocabularyItem {
  term: string;
  translation: string;
  mnemonic: string;
  tags: string[];
}

export interface IVocabularyGenerator {
  generate(
    topic: string, 
    count: number, 
    existingTerms: string[]
  ): Promise<GeneratedVocabularyItem[]>;
}
