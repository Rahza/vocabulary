import { describe, it, expect } from 'vitest';
import { smartShuffle } from './shuffle';

describe('smartShuffle', () => {
  it('should maintain a minimum distance of 3 between items with same ID', () => {
    // 20 words, 2 directions each = 40 items
    const items = Array.from({ length: 20 }, (_, i) => [
      { id: `${i}`, dir: 'a' },
      { id: `${i}`, dir: 'b' }
    ]).flat();

    // Run multiple times to ensure randomness doesn't hide bugs
    for (let run = 0; run < 50; run++) {
      const result = smartShuffle(items, (item) => item.id);
      
      for (let i = 0; i < result.length; i++) {
        const current = result[i];
        
        // If dist is 3, then i and i+3 can be same. i+1 and i+2 must not.
        // Wait, if user wants AT LEAST 2 in between:
        // [W1, Other1, Other2, W1] -> dist is 3 (index 0 and 3).
        // So i+1, i+2 must be different.
        // If I use minDistance = 3 in lookback, it checks last 3 items.
        // So it prevents i+1, i+2, i+3 from being same as i.
        // [W1, Other1, Other2, Other3, W1] -> dist is 4.
        // Let's re-read the code logic.
        // lookback = min(result.length, minDistance)
        // for j from 1 to lookback: check result[length-j]
        // If minDistance is 3, it checks result[last], result[last-1], result[last-2].
        // This prevents same ID in the previous 3 slots.
        // So [W1, O1, O2, O3, W1] is the first allowed. 
        // W1 at 0, next W1 at 4. 3 items in between (O1, O2, O3).
        // The user said "at least 2 other words".
        // [W1, O1, O2, W1] -> 2 words between. Indices 0 and 3. Distance 3.
        // To allow [W1, O1, O2, W1], we must NOT check 3 slots back.
        // We only check 2 slots back. 
        // So minDistance should be 2 to prevent [W1, W1] and [W1, O1, W1].
        // WAIT.
        // If minDistance is 2:
        // checks j=1 (prev), j=2 (prev-prev).
        // So it allows W1 at pos 0 and pos 3.
        // [W1, O1, O2, W1] -> distance is 3. 2 items between.
        // This is exactly what the user wanted ("at least 2 other words in between").
        // BUT the previous implementation had minDistance = 2!
        // Why did the user report it failed?
        // Ah, look at my previous T003/T004 implementation:
        // `const lookback = Math.min(result.length, minDistance);`
        // If length is 2 (items at 0, 1), and we are picking for index 2.
        // lookback is 2. Checks index 1 and 0.
        // So Word at 2 cannot be Word at 1 or 0.
        // So [W1, O1, O2] -> Word at 2 can't be W1 or O1.
        // This means W1 can only appear at index 3.
        // [W1, O1, O2, W1] -> Success.
        
        // Maybe the greedy approach with fallbacks is the problem?
        // `if (candidateIndex === -1) { candidateIndex = 0; }`
        // If it can't find a valid one, it picks the first one in the pool.
        // And the pool is sorted by "twins first" (counts).
        
        // I'll keep minDistance = 2 in the code if it means 2 items between (dist 3).
        // Let's check my test logic.
        if (i + 1 < result.length) {
          expect(result[i+1].id).not.toBe(current.id);
        }
        if (i + 2 < result.length) {
          expect(result[i+2].id).not.toBe(current.id);
        }
        // If I want to ensure distance 3:
        // if (i + 3 < result.length) {
        //   expect(result[i+3].id).not.toBe(current.id);
        // }
      }
    }
  });

  it('should handle small sets where distancing is impossible', () => {
    const items = [{ id: '1', dir: 'a' }, { id: '1', dir: 'b' }];
    const result = smartShuffle(items, (item) => item.id);
    expect(result.length).toBe(2);
    // Logic should fall back to first available if conflict unavoidable
  });
});
