export type UUID = string;

export interface VocabularyPair {
  id: UUID;
  german: string;
  czech: string;
  mnemonic: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string; // ISO Date
}

export interface LeitnerState {
  vocabId: UUID;
  direction: 'DE_TO_CZ' | 'CZ_TO_DE';
  box: 1 | 2 | 3 | 4 | 5;
  lastReviewed: string; // ISO Date
  nextReview: string;   // ISO Date
  history: ReviewResult[];
}

export interface ReviewResult {
  date: string; // ISO Date
  success: boolean;
}

export interface UserSettings {
  openaiApiKey?: string;
  theme: 'light' | 'dark' | 'system';
  dailyGoal: number;
}

export interface TagStats {
  tagName: string;
  totalWords: number;
  masteredWords: number; // Box 5
  learningWords: number; // Box 1-4
  boxDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface GlobalStats {
  totalWords: number;
  masteredWords: number;
  boxDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
