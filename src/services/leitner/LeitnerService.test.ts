import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LeitnerService } from './LeitnerService';
import { LeitnerState } from '@/models/types';
import { DIRECTION_FORWARD } from '@/constants/languages';

describe('LeitnerService', () => {
    let service: LeitnerService;

    beforeEach(() => {
        service = new LeitnerService();
        // Mock Date to have consistent test results
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2025-01-15T10:00:00.000Z'));
    });

    const createMockState = (overrides: Partial<LeitnerState> = {}): LeitnerState => ({
        vocabId: 'vocab-123',
        direction: DIRECTION_FORWARD,
        box: 1,
        lastReviewed: '2025-01-14T10:00:00.000Z',
        nextReview: '2025-01-15T10:00:00.000Z',
        history: [],
        ownerId: 'user-123',
        ...overrides,
    });

    describe('processReview', () => {
        it('should promote to next box on successful review (box 1 -> 2)', () => {
            const state = createMockState({ box: 1 });
            const result = service.processReview(state, true);

            expect(result.box).toBe(2);
        });

        it('should promote to next box on successful review (box 4 -> 5)', () => {
            const state = createMockState({ box: 4 });
            const result = service.processReview(state, true);

            expect(result.box).toBe(5);
        });

        it('should stay at box 5 on successful review (max box)', () => {
            const state = createMockState({ box: 5 });
            const result = service.processReview(state, true);

            expect(result.box).toBe(5);
        });

        it('should demote to box 1 on failed review', () => {
            const state = createMockState({ box: 3 });
            const result = service.processReview(state, false);

            expect(result.box).toBe(1);
        });

        it('should append to history on successful review', () => {
            const state = createMockState({
                history: [{ date: '2025-01-13T10:00:00.000Z', success: true }],
            });
            const result = service.processReview(state, true);

            expect(result.history).toHaveLength(2);
            expect(result.history[1]).toEqual({
                date: '2025-01-15T10:00:00.000Z',
                success: true,
            });
        });

        it('should append to history on failed review', () => {
            const state = createMockState({ history: [] });
            const result = service.processReview(state, false);

            expect(result.history).toHaveLength(1);
            expect(result.history[0]).toEqual({
                date: '2025-01-15T10:00:00.000Z',
                success: false,
            });
        });

        it('should update lastReviewed to current time', () => {
            const state = createMockState();
            const result = service.processReview(state, true);

            expect(result.lastReviewed).toBe('2025-01-15T10:00:00.000Z');
        });

        it('should calculate nextReview for box 1 (1 day interval)', () => {
            const state = createMockState({ box: 2 }); // Will demote to 1
            const result = service.processReview(state, false);

            expect(result.box).toBe(1);
            expect(result.nextReview).toBe('2025-01-16T10:00:00.000Z');
        });

        it('should calculate nextReview for box 2 (3 days interval)', () => {
            const state = createMockState({ box: 1 }); // Will promote to 2
            const result = service.processReview(state, true);

            expect(result.box).toBe(2);
            expect(result.nextReview).toBe('2025-01-18T10:00:00.000Z');
        });

        it('should calculate nextReview for box 3 (7 days interval)', () => {
            const state = createMockState({ box: 2 }); // Will promote to 3
            const result = service.processReview(state, true);

            expect(result.box).toBe(3);
            expect(result.nextReview).toBe('2025-01-22T10:00:00.000Z');
        });

        it('should calculate nextReview for box 4 (14 days interval)', () => {
            const state = createMockState({ box: 3 }); // Will promote to 4
            const result = service.processReview(state, true);

            expect(result.box).toBe(4);
            expect(result.nextReview).toBe('2025-01-29T10:00:00.000Z');
        });

        it('should calculate nextReview for box 5 (30 days interval)', () => {
            const state = createMockState({ box: 4 }); // Will promote to 5
            const result = service.processReview(state, true);

            expect(result.box).toBe(5);
            expect(result.nextReview).toBe('2025-02-14T10:00:00.000Z');
        });

        it('should not mutate the original state', () => {
            const state = createMockState({ box: 2, history: [] });
            const originalBox = state.box;
            const originalHistoryLength = state.history.length;

            service.processReview(state, true);

            expect(state.box).toBe(originalBox);
            expect(state.history.length).toBe(originalHistoryLength);
        });
    });
});
