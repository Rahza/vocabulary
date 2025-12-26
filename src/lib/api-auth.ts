import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

/**
 * Result of verifying a Firebase auth token.
 * Either returns the decoded token or an error response.
 */
export type VerifyResult =
    | { success: true; uid: string }
    | { success: false; response: NextResponse };

/**
 * Verify Firebase ID token from request Authorization header.
 * Returns the user's UID on success, or an error response on failure.
 */
export const verifyAuthToken = async (
    request: NextRequest
): Promise<VerifyResult> => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return {
            success: false,
            response: NextResponse.json(
                { error: 'Unauthorized - Missing token' },
                { status: 401 }
            ),
        };
    }

    const idToken = authHeader.substring(7);

    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return { success: true, uid: decodedToken.uid };
    } catch (error) {
        console.error('Token verification failed:', error);
        return {
            success: false,
            response: NextResponse.json(
                { error: 'Unauthorized - Invalid token' },
                { status: 401 }
            ),
        };
    }
};
