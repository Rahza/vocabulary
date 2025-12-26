import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Flashcard } from './Flashcard';
import { VocabularyPair } from '@/models/types';
import { DIRECTION_FORWARD } from '@/constants/languages';

// Mock context
vi.mock('@/contexts/SettingsContext', () => ({
  useSettings: () => ({
    settings: {
      sourceLanguage: 'German',
      targetLanguage: 'Czech',
    }
  })
}));

const mockWord: VocabularyPair = {
  id: '123',
  source: 'Hund',
  target: 'Pes',
  mnemonic: 'A dog pees',
  tags: ['animals'],
  difficulty: 'Beginner',
  createdAt: '2023-01-01'
};

describe('Flashcard', () => {
  const onSubmit = vi.fn();
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <Flashcard 
        word={mockWord} 
        direction={DIRECTION_FORWARD} 
        onSubmit={onSubmit} 
        onNext={onNext} 
        result={null} 
      />
    );
    expect(screen.getByText('Hund')).toBeInTheDocument();
  });

  it('submits answer', () => {
    render(
      <Flashcard 
        word={mockWord} 
        direction={DIRECTION_FORWARD} 
        onSubmit={onSubmit} 
        onNext={onNext} 
        result={null} 
      />
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Pes' } });
    fireEvent.submit(input);
    expect(onSubmit).toHaveBeenCalledWith('Pes');
  });
});