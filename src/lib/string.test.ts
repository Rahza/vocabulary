import { describe, it, expect } from 'vitest';
import { getLevenshteinDistance } from './string';

describe('getLevenshteinDistance', () => {
  it('should return 0 for identical strings', () => {
    expect(getLevenshteinDistance('ahoj', 'ahoj')).toBe(0);
  });

  it('should return 1 for a single substitution', () => {
    expect(getLevenshteinDistance('ahoj', 'ahox')).toBe(1);
  });

  it('should return 1 for a single insertion', () => {
    expect(getLevenshteinDistance('ahoj', 'ahojx')).toBe(1);
  });

  it('should return 1 for a single deletion', () => {
    expect(getLevenshteinDistance('ahoj', 'aho')).toBe(1);
  });

  it('should return the correct distance for multiple edits', () => {
    expect(getLevenshteinDistance('kitten', 'sitting')).toBe(3);
  });

  it('should be case-insensitive', () => {
    expect(getLevenshteinDistance('Ahoj', 'ahoj')).toBe(0);
  });
});
