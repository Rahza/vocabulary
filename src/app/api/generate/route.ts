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

        const systemPrompt = `You are a language learning assistant that generates vocabulary pairs for ${sourceLanguage} to ${targetLanguage} learners.
Generate exactly ${count} unique vocabulary pairs related to the theme "${theme}" at difficulty level "${difficulty}".

For each word, provide:
1. source: The word in ${sourceLanguage}
2. target: The translation in ${targetLanguage}
3. mnemonic: A creative memory aid that helps remember the translation (in ${sourceLanguage})
4. tags: An array with the theme as the first tag
5. difficulty: "${difficulty}"

IMPORTANT: 
- Do NOT include any of these existing terms: ${existingTerms.join(', ') || 'none'}
- Generate ONLY new, unique vocabulary pairs
- Return valid JSON array only, no markdown formatting`;

        const userPrompt = `Generate ${count} ${difficulty} level vocabulary pairs for the theme "${theme}" in ${sourceLanguage} to ${targetLanguage}.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-5.2',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.8,
            response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
        }

        // Parse the response
        const parsed = JSON.parse(content);
        const vocabulary: GeneratedVocabulary[] = parsed.vocabulary || parsed.words || parsed;

        // Validate and normalize the response
        const normalizedVocab = (Array.isArray(vocabulary) ? vocabulary : [vocabulary]).map(
            (item) => ({
                source: item.source || '',
                target: item.target || '',
                mnemonic: item.mnemonic || '',
                tags: Array.isArray(item.tags) ? item.tags : [theme],
                difficulty: item.difficulty || difficulty,
            })
        );

        // Filter out any items matching existing terms
        const filteredVocab = normalizedVocab.filter(
            (item) =>
                item.source &&
                item.target &&
                !existingTerms.some((term) => term.toLowerCase() === item.source.toLowerCase())
        );

        return NextResponse.json({ vocabulary: filteredVocab }, { status: 200 });
    } catch (error) {
        console.error('Generate API error:', error);
        return NextResponse.json({ error: 'Failed to generate vocabulary' }, { status: 500 });
    }
};
