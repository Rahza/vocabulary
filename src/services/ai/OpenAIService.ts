import { VocabularyPair } from '@/models/types';
import { getFirebaseAuth } from '@/lib/firebase';

export interface IAIService {
  generateVocabulary(
    theme: string,
    difficulty: string,
    count: number,
    sourceLanguage: string,
    targetLanguage: string,
    existingTerms?: string[]
  ): Promise<Omit<VocabularyPair, 'id' | 'createdAt'>[]>;

  generateSingleMnemonic(
    sourceWord: string,
    targetWord: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string>;
}

export class OpenAIService implements IAIService {
  private async getIdToken(): Promise<string> {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to generate vocabulary');
    }
    return user.getIdToken();
  }

  async generateSingleMnemonic(
    sourceWord: string,
    targetWord: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string> {
    const idToken = await this.getIdToken();

    const response = await fetch('/api/mnemonic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        sourceWord,
        targetWord,
        sourceLanguage,
        targetLanguage,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate mnemonic');
    }

    const data = await response.json();
    return data.mnemonic;
  }

  async generateVocabulary(
    theme: string,
    difficulty: string,
    count: number,
    sourceLanguage: string,
    targetLanguage: string,
    existingTerms: string[] = []
  ): Promise<Omit<VocabularyPair, 'id' | 'createdAt'>[]> {
    const idToken = await this.getIdToken();

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        theme,
        difficulty,
        count,
        sourceLanguage,
        targetLanguage,
        existingTerms,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate vocabulary');
    }

    const data = await response.json();
    return data.vocabulary || [];
  }
}
