import OpenAI from "openai";
import { VocabularyPair } from "@/models/types";

export interface IAIService {
  generateVocabulary(
    theme: string,
    difficulty: string,
    count: number,
    apiKey: string,
    existingTerms?: string[]
  ): Promise<Omit<VocabularyPair, "id" | "createdAt">[]>;

  generateSingleMnemonic(
    german: string,
    czech: string,
    apiKey: string
  ): Promise<string>;
}

export class OpenAIService implements IAIService {
  async generateSingleMnemonic(
    german: string,
    czech: string,
    apiKey: string
  ): Promise<string> {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `
      Create a helpful mnemonic (memory aid) in GERMAN to remember the Czech word "${czech}" given the German word "${german}".
      The mnemonic should be creative and effective.
      Return ONLY the mnemonic text, no JSON, no explanations.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful language tutor." }, { role: "user", content: prompt }],
      model: "gpt-5.2",
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
    existingTerms: string[] = []
  ): Promise<Omit<VocabularyPair, "id" | "createdAt">[]> {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // We are calling from client-side as per requirements
    });

    // Request more words to account for potential duplicates being filtered out
    const requestCount = Math.ceil(count * 1.5);

    const prompt = `
      Generate ${requestCount} German-Czech vocabulary pairs related to the theme "${theme}".
      Difficulty level: ${difficulty}.
      For each pair, provide a helpful mnemonic (memory aid) in GERMAN to remember the Czech word given the German word.
      Also assign relevant tags in GERMAN to each pair (including the theme itself).
      IMPORTANT: Tags MUST be generic categories (e.g. "Zahlen", "Farben", "Natur") and NOT word-specific or literal (e.g. do NOT use "1" as a tag for the word "eins").
      
      Return ONLY a JSON object with the following structure:
      {
        "pairs": [
          {
            "german": "string",
            "czech": "string",
            "mnemonic": "string",
            "tags": ["string"],
            "difficulty": "${difficulty}"
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful language tutor." }, { role: "user", content: prompt }],
      model: "gpt-5.2",
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content received from AI");

    try {
      const parsed = JSON.parse(content);
      let pairs: Omit<VocabularyPair, "id" | "createdAt">[] = parsed.pairs;
      
      // Filter duplicates
      if (existingTerms.length > 0) {
        pairs = pairs.filter(p => !existingTerms.some(existing => existing.toLowerCase() === p.german.toLowerCase()));
      }
      
      // Trim to requested count
      return pairs.slice(0, count);
    } catch {
      console.error("Failed to parse AI response", content);
      throw new Error("Failed to parse AI response");
    }
  }
}
