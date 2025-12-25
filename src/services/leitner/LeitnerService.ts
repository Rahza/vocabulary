import { LeitnerState } from "@/models/types";

// Intervals in days for boxes 1 to 5
const BOX_INTERVALS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

export class LeitnerService {
  processReview(state: LeitnerState, success: boolean): LeitnerState {
    const now = new Date();
    const newState = { ...state };
    
    // Add history
    newState.history = [
      ...state.history,
      { date: now.toISOString(), success },
    ];
    newState.lastReviewed = now.toISOString();

    if (success) {
      // Promote or stay at 5
      newState.box = Math.min(state.box + 1, 5) as 1 | 2 | 3 | 4 | 5;
    } else {
      // Demote to 1
      newState.box = 1;
    }

    // Calculate next review
    const intervalDays = BOX_INTERVALS[newState.box];
    const nextDate = new Date();
    nextDate.setDate(now.getDate() + intervalDays);
    newState.nextReview = nextDate.toISOString();

    return newState;
  }
}
