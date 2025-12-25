# Data Model: UI & Stats Refinements

This document defines the corrected analytical structures for the dashboard.

## Entities

### GlobalStats
The authoritative summary of the vocabulary collection.
- `totalUniqueWords`: Number (Calculated as `allVocabulary.length`)
- `totalMasteredWords`: Number (Count of words where BOTH directions are Box 5)
- `boxDistribution`: Map of Box ID (1-5) to word count.

### TagStats (Existing)
Corrected to be used only for per-tag breakdowns, not for global summation.
- `tagName`: String
- `totalWords`: Number
- `masteredWords`: Number
- `learningWords`: Number
- `boxDistribution`: Map of Box ID (1-5) to word count.
