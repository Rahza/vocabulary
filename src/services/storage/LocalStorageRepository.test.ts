import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalStorageRepository } from './LocalStorageRepository';
import { DIRECTION_FORWARD, DIRECTION_BACKWARD } from '@/constants/languages';

describe('LocalStorageRepository Migration', () => {
  const STORAGE_KEYS = {
    VOCAB: 'ai_vocab_data',
    LEITNER: 'ai_vocab_leitner',
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should migrate legacy data (german/czech) to generic source/target', () => {
    // Setup legacy data
    const legacyVocab = [
      {
        id: '1',
        german: 'Hund',
        czech: 'Pes',
        mnemonic: '...',
        tags: ['Test'],
        difficulty: 'Beginner',
        createdAt: new Date().toISOString(),
      },
    ];

    const legacyLeitner = [
      {
        vocabId: '1',
        direction: 'DE_TO_CZ',
        box: 1,
        lastReviewed: new Date().toISOString(),
        nextReview: new Date().toISOString(),
        history: [],
      },
      {
        vocabId: '1',
        direction: 'CZ_TO_DE',
        box: 1,
        lastReviewed: new Date().toISOString(),
        nextReview: new Date().toISOString(),
        history: [],
      },
    ];

    localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(legacyVocab));
    localStorage.setItem(STORAGE_KEYS.LEITNER, JSON.stringify(legacyLeitner));

    // Initialize repository, which triggers migration
    new LocalStorageRepository();

    // Verify localStorage content directly
    const migratedVocabJson = localStorage.getItem(STORAGE_KEYS.VOCAB);
    const migratedVocab = JSON.parse(migratedVocabJson!) as Array<{
      source?: string;
      target?: string;
      german?: string;
      czech?: string;
    }>;

    expect(migratedVocab[0]).toHaveProperty('source', 'Hund');
    expect(migratedVocab[0]).toHaveProperty('target', 'Pes');
    expect(migratedVocab[0]).not.toHaveProperty('german');
    expect(migratedVocab[0]).not.toHaveProperty('czech');

    const migratedLeitnerJson = localStorage.getItem(STORAGE_KEYS.LEITNER);
    const migratedLeitner = JSON.parse(migratedLeitnerJson!) as Array<{
      direction: string;
      vocabId: string;
    }>;

    const forward = migratedLeitner.find((l) => l.direction === DIRECTION_FORWARD);
    const backward = migratedLeitner.find((l) => l.direction === DIRECTION_BACKWARD);

    expect(forward).toBeDefined();
    expect(backward).toBeDefined();
    expect(forward!.vocabId).toBe('1');
    expect(backward!.vocabId).toBe('1');
  });

  it('should not modify already migrated data', () => {
    const modernVocab = [
      {
        id: '2',
        source: 'Katze',
        target: 'Kocka',
        mnemonic: '...',
        tags: ['Test'],
        difficulty: 'Beginner',
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEYS.VOCAB, JSON.stringify(modernVocab));

    // Initialize repository
    new LocalStorageRepository();

    const resultJson = localStorage.getItem(STORAGE_KEYS.VOCAB);
    const result = JSON.parse(resultJson!);

    expect(result[0]).toEqual(modernVocab[0]);
    expect(result[0]).not.toHaveProperty('german');
  });
});
