# Data Model: Language Selector & Refinement

## Core Entities

### VocabularyPair (Refactored)

Represents a single vocabulary item with a source term and a target term.

```typescript
export interface VocabularyPair {
  id: string; // UUID
  source: string; // Previously 'german'
  target: string; // Previously 'czech'
  mnemonic: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: string; // ISO Date
}
```

### LeitnerState (Refactored)

Tracks the learning progress of a vocabulary item in a specific direction.

```typescript
export interface LeitnerState {
  vocabId: string; // UUID
  direction: LanguageDirection; // Refactored type
  box: 1 | 2 | 3 | 4 | 5;
  lastReviewed: string; // ISO Date
  nextReview: string; // ISO Date
  history: ReviewResult[];
}
```

### UserSettings (Updated)

Persisted user preferences including the active language pair.

```typescript
export interface UserSettings {
  openaiApiKey?: string;
  theme: 'light' | 'dark' | 'system';
  language: SupportedLanguage; // App interface language
  sourceLanguage?: SupportedLanguage; // Learning Source
  targetLanguage?: SupportedLanguage; // Learning Target
  languagePairSelected?: boolean;
  dailyGoal: number;
}
```

## Types & Constants

### SupportedLanguage

Strict union of all allowed languages.

```typescript
export type SupportedLanguage = 'English' | 'German' | 'Czech' | 'French' | 'Italian' | 'Spanish';
```

### LanguageDirection

Generic direction identifiers.

```typescript
export const DIRECTION_FORWARD = 'SOURCE_TO_TARGET';
export const DIRECTION_BACKWARD = 'TARGET_TO_SOURCE';

export type LanguageDirection = typeof DIRECTION_FORWARD | typeof DIRECTION_BACKWARD;
```

## Migration Schema

The migration logic maps legacy fields to new generic fields.

| Legacy Field | New Field          | Note                                   |
| ------------ | ------------------ | -------------------------------------- |
| `german`     | `source`           | Assumes existing data is German source |
| `czech`      | `target`           | Assumes existing data is Czech target  |
| `DE_TO_CZ`   | `SOURCE_TO_TARGET` | Forward direction                      |
| `CZ_TO_DE`   | `TARGET_TO_SOURCE` | Backward direction                     |
