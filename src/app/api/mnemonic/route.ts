import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/api-auth';
import OpenAI from 'openai';

interface MnemonicRequestBody {
    sourceWord: string;
    targetWord: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export const POST = async (request: NextRequest) => {
    try {
        // Verify Firebase ID token
        const authResult = await verifyAuthToken(request);
        if (!authResult.success) {
            return authResult.response;
        }

        // Parse request body
        const body: MnemonicRequestBody = await request.json();
        const { sourceWord, targetWord, sourceLanguage, targetLanguage } = body;

        // Validate required fields
        if (!sourceWord || !targetWord || !sourceLanguage || !targetLanguage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check for OpenAI API key - if not set, return mock mnemonic
        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            console.log('📝 OPENAI_API_KEY not configured - returning mock mnemonic');
            const mockMnemonic = `Think of "${sourceWord}" when you see "${targetWord}" - imagine a memorable story connecting them!`;
            return NextResponse.json({ mnemonic: mockMnemonic }, { status: 200 });
        }

        // Initialize OpenAI client
        const openai = new OpenAI({ apiKey: openaiApiKey });

        const prompt = `Create a helpful mnemonic (memory aid) in ${sourceLanguage.toUpperCase()} to remember the ${targetLanguage.toUpperCase()} word "${targetWord}" given the ${sourceLanguage.toUpperCase()} word "${sourceWord}".
The mnemonic should be creative and effective.
Return ONLY the mnemonic text, no JSON, no explanations.`;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful language tutor.' },
                { role: 'user', content: prompt },
            ],
            model: 'gpt-5.2',
            temperature: 0.8,
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
        }

        return NextResponse.json({ mnemonic: content.trim() }, { status: 200 });
    } catch (error) {
        console.error('Mnemonic API error:', error);
        return NextResponse.json({ error: 'Failed to generate mnemonic' }, { status: 500 });
    }
};
