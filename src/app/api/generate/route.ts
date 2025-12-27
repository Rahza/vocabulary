import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/api-auth';
import OpenAI from 'openai';

interface GenerateRequestBody {
    theme: string;
    difficulty: string;
    count: number;
    sourceLanguage: string;
    targetLanguage: string;
    existingTerms?: string[];
}

interface GeneratedVocabulary {
    source: string;
    target: string;
    mnemonic: string;
    tags: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Mock vocabulary data for local development
const mockWords: Record<string, { source: string; target: string }[]> = {
    food: [
        { source: 'Apfel', target: 'apple' },
        { source: 'Brot', target: 'bread' },
        { source: 'Käse', target: 'cheese' },
        { source: 'Milch', target: 'milk' },
        { source: 'Wasser', target: 'water' },
        { source: 'Fleisch', target: 'meat' },
        { source: 'Fisch', target: 'fish' },
        { source: 'Gemüse', target: 'vegetables' },
    ],
    animals: [
        { source: 'Hund', target: 'dog' },
        { source: 'Katze', target: 'cat' },
        { source: 'Vogel', target: 'bird' },
        { source: 'Pferd', target: 'horse' },
        { source: 'Kuh', target: 'cow' },
        { source: 'Schwein', target: 'pig' },
    ],
    default: [
        { source: 'Haus', target: 'house' },
        { source: 'Auto', target: 'car' },
        { source: 'Buch', target: 'book' },
        { source: 'Schule', target: 'school' },
        { source: 'Arbeit', target: 'work' },
        { source: 'Familie', target: 'family' },
        { source: 'Freund', target: 'friend' },
        { source: 'Stadt', target: 'city' },
    ],
};

const generateMockVocabulary = (
    theme: string,
    difficulty: string,
    count: number
): GeneratedVocabulary[] => {
    const themeKey = theme.toLowerCase();
    const words = mockWords[themeKey] || mockWords.default;

    return words.slice(0, count).map((word, index) => ({
        source: word.source,
        target: word.target,
        mnemonic: `Mock mnemonic for ${word.source} → ${word.target} (#${index + 1})`,
        tags: [theme],
        difficulty: difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
    }));
};

export const POST = async (request: NextRequest) => {
    try {
        // Verify Firebase ID token
        const authResult = await verifyAuthToken(request);
        if (!authResult.success) {
            return authResult.response;
        }

        // Parse request body
        const body: GenerateRequestBody = await request.json();
        const { theme, difficulty, count, sourceLanguage, targetLanguage, existingTerms = [] } = body;

        // Validate required fields
        if (!theme || !difficulty || !count || !sourceLanguage || !targetLanguage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check for OpenAI API key - if not set, return mock data for local development
        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            console.log('📚 OPENAI_API_KEY not configured - returning mock vocabulary');
            const mockVocabulary = generateMockVocabulary(theme, difficulty, count);
            return NextResponse.json({ vocabulary: mockVocabulary }, { status: 200 });
        }

        // Initialize OpenAI client
        const openai = new OpenAI({ apiKey: openaiApiKey });

        // Request more words to account for potential duplicates being filtered out
        const requestCount = Math.ceil(count * 1.5);

        const prompt = `
Generate ${requestCount} ${sourceLanguage}-${targetLanguage} vocabulary pairs related to the theme "${theme}".
Difficulty level: ${difficulty}.
For each pair, provide a helpful mnemonic (memory aid) in ${sourceLanguage} to remember the ${targetLanguage} word given the ${sourceLanguage} word.
Also assign relevant tags in ${sourceLanguage} to each pair (including a generic description of the theme itself).
IMPORTANT: Tags MUST be generic categories (e.g. "Zahlen", "Farben", "Natur") and NOT word-specific or literal.
${existingTerms.length > 0 ? `Do NOT include any of these existing terms: ${existingTerms.join(', ')}` : ''}

Return ONLY a JSON object with the following structure:
{
  "pairs": [
    {
      "source": "word in ${sourceLanguage}",
      "target": "word in ${targetLanguage}",
      "mnemonic": "memory aid in ${sourceLanguage}",
      "tags": ["${theme}", "other relevant tags"],
      "difficulty": "${difficulty}"
    }
  ]
}
`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-5.2',
            messages: [
                { role: 'system', content: 'You are a helpful language tutor.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.8,
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
        }

        // Parse the response
        let pairs: GeneratedVocabulary[];
        try {
            const parsed = JSON.parse(content);
            pairs = parsed.pairs || parsed.vocabulary || parsed.words || [];
        } catch {
            console.error('Failed to parse AI response:', content);
            return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
        }

        // Ensure we have an array
        if (!Array.isArray(pairs)) {
            pairs = [pairs];
        }

        // Filter out duplicates from existing terms
        if (existingTerms.length > 0) {
            pairs = pairs.filter(
                (p) => !existingTerms.some((existing) => existing.toLowerCase() === p.source.toLowerCase())
            );
        }

        // Trim to requested count and normalize
        const vocabulary = pairs.slice(0, count).map((item) => ({
            source: item.source || '',
            target: item.target || '',
            mnemonic: item.mnemonic || '',
            tags: Array.isArray(item.tags) ? item.tags : [theme],
            difficulty: item.difficulty || difficulty,
        }));

        return NextResponse.json({ vocabulary }, { status: 200 });
    } catch (error: unknown) {
        console.error('Generate API error:', error);
        const errMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Failed to generate vocabulary', details: errMessage }, { status: 500 });
    }
};
