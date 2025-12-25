export function smartShuffle<T>(items: T[], getId: (item: T) => string): T[] {
  if (items.length <= 1) return items;
  
  // Fisher-Yates initial shuffle
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  
  const result: T[] = [];
  const minDistance = 2; // Ensures at least 2 other words between same word pair
  
  while (pool.length > 0) {
    let candidateIndex = -1;
    
    // Weighted search: try to find a candidate that doesn't conflict, 
    // preferring those whose ID appears most in the pool (to avoid getting stuck at the end)
    const counts = new Map<string, number>();
    pool.forEach(item => {
      const id = getId(item);
      counts.set(id, (counts.get(id) || 0) + 1);
    });

    // Sort pool temporarily by count descending to try picking items with more twins first
    // but preserve the relative random order for same counts
    const searchPool = pool.map((item, index) => ({ item, index }))
      .sort((a, b) => {
        const countA = counts.get(getId(a.item)) || 0;
        const countB = counts.get(getId(b.item)) || 0;
        return countB - countA;
      });

    for (const { item, index } of searchPool) {
      const candidateId = getId(item);
      let conflict = false;
      const lookback = Math.min(result.length, minDistance);
      for (let j = 1; j <= lookback; j++) {
        if (getId(result[result.length - j]) === candidateId) {
          conflict = true;
          break;
        }
      }
      
      if (!conflict) {
        candidateIndex = index;
        break;
      }
    }
    
    // Fallback: If no valid candidate satisfies minDistance, 
    // try to pick one that is at least NOT the immediate previous (dist 1)
    if (candidateIndex === -1) {
      for (let i = 0; i < pool.length; i++) {
        if (result.length > 0 && getId(result[result.length - 1]) !== getId(pool[i])) {
          candidateIndex = i;
          break;
        }
      }
    }
    
    // Final fallback: pick first available
    if (candidateIndex === -1) {
      candidateIndex = 0;
    }
    
    const picked = pool.splice(candidateIndex, 1)[0];
    result.push(picked);
  }
  
  return result;
}
