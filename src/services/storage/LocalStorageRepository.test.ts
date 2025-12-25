import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageRepository } from './LocalStorageRepository';
import { VocabularyPair } from '@/models/types';

describe('LocalStorageRepository', () => {
  let repo: LocalStorageRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalStorageRepository();
  });

  it('should return false if vocabulary does not exist', async () => {
    const exists = await repo.exists('nonexistent');
    expect(exists).toBe(false);
  });

  it('should return true if vocabulary exists', async () => {
    const pair: Omit<VocabularyPair, 'id' | 'createdAt'> = {
      german: 'Hund',
      czech: 'Pes',
      mnemonic: '...',
      tags: ['test'],
      difficulty: 'Beginner'
    };
    await repo.addVocabulary([pair]);
    const exists = await repo.exists('Hund');
    expect(exists).toBe(true);
  });

  it('should be case insensitive', async () => {
    const pair: Omit<VocabularyPair, 'id' | 'createdAt'> = {
      german: 'Katze',
      czech: 'Kočka',
      mnemonic: '...',
      tags: ['test'],
      difficulty: 'Beginner'
    };
    await repo.addVocabulary([pair]);
    const exists = await repo.exists('katze');
    expect(exists).toBe(true);
  });

  describe('renameTagGlobal', () => {
    it('should rename a tag across all items', async () => {
      const p1: Omit<VocabularyPair, 'id' | 'createdAt'> = {
        german: 'Hund', czech: 'Pes', mnemonic: '', tags: ['A', 'B'], difficulty: 'Beginner'
      };
      const p2: Omit<VocabularyPair, 'id' | 'createdAt'> = {
        german: 'Katze', czech: 'Kočka', mnemonic: '', tags: ['A', 'C'], difficulty: 'Beginner'
      };
      await repo.addVocabulary([p1, p2]);

      await repo.renameTagGlobal('A', 'Z');

      const all = await repo.getAllVocabulary();
      expect(all[0].tags).toEqual(['Z', 'B']);
      expect(all[1].tags).toEqual(['Z', 'C']);
    });

    it('should deduplicate if the new tag name already exists', async () => {
      const p1: Omit<VocabularyPair, 'id' | 'createdAt'> = {
        german: 'Hund', czech: 'Pes', mnemonic: '', tags: ['A', 'B'], difficulty: 'Beginner'
      };
      await repo.addVocabulary([p1]);

      await repo.renameTagGlobal('A', 'B');

      const all = await repo.getAllVocabulary();
      expect(all[0].tags).toEqual(['B']);
    });
  });
});
