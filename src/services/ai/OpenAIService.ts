import OpenAI from "openai";
import { VocabularyPair } from "@/models/types";

export interface IAIService {
  generateVocabulary(
    theme: string,
    difficulty: string,
    count: number,
    apiKey: string,
    sourceLanguage: string,
    targetLanguage: string,
    existingTerms?: string[]
  ): Promise<Omit<VocabularyPair, "id" | "createdAt">[]>;

  generateSingleMnemonic(
    sourceWord: string,
    targetWord: string,
    apiKey: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string>;
}

export class OpenAIService implements IAIService {
  async generateSingleMnemonic(
    sourceWord: string,
    targetWord: string,
    apiKey: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string> {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `
      Create a helpful mnemonic (memory aid) in ${sourceLanguage.toUpperCase()} to remember the ${targetLanguage.toUpperCase()} word "${targetWord}" given the ${sourceLanguage.toUpperCase()} word "${sourceWord}".
      The mnemonic should be creative and effective.
      Return ONLY the mnemonic text, no JSON, no explanations.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful language tutor." }, { role: "user", content: prompt }],
      model: "gpt-4o",
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content received from AI");

    return content.trim();
  }

  async generateVocabulary(
    theme: string,
    difficulty: string,
    count: number,
    apiKey: string,
    sourceLanguage: string,
    targetLanguage: string,
    existingTerms: string[] = []
  ): Promise<Omit<VocabularyPair, "id" | "createdAt">[]> {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // We are calling from client-side as per requirements
    });

    // Request more words to account for potential duplicates being filtered out
    const requestCount = Math.ceil(count * 1.5);

    const prompt = `
      Generate ${requestCount} ${sourceLanguage}-${targetLanguage} vocabulary pairs related to the theme "${theme}".
      Difficulty level: ${difficulty}.
      For each pair, provide a helpful mnemonic (memory aid) in ${sourceLanguage.toUpperCase()} to remember the ${targetLanguage.toUpperCase()} word given the ${sourceLanguage.toUpperCase()} word.
      Also assign relevant tags in ${sourceLanguage.toUpperCase()} to each pair (including the theme itself).
      IMPORTANT: Tags MUST be generic categories (e.g. "Zahlen", "Farben", "Natur") and NOT word-specific or literal (e.g. do NOT use "1" as a tag for the word "eins").
      
      Return ONLY a JSON object with the following structure:
      {
        "pairs": [
          {
            "source": "the ${sourceLanguage} word",
            "target": "the ${targetLanguage} translation",
            "mnemonic": "string",
            "tags": ["string"],
            "difficulty": "${difficulty}"
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful language tutor." }, { role: "user", content: prompt }],
      model: "gpt-4o",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content received from AI");

    try {
      const parsed = JSON.parse(content);
      let pairs: Omit<VocabularyPair, "id" | "createdAt">[] = parsed.pairs;
      
      // Filter duplicates
      if (existingTerms.length > 0) {
        pairs = pairs.filter(p => !existingTerms.some(existing => existing.toLowerCase() === p.source.toLowerCase()));
      }
      
      // Trim to requested count
      return pairs.slice(0, count);
    } catch {
      console.error("Failed to parse AI response", content);
      throw new Error("Failed to parse AI response");
    }
  }
}
