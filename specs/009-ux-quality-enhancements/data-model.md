# Data Model: UX Refinements

This document defines the analytical structures and temporary states for the UX enhancements.

## Entities

### TagStats (Expanded)

Aggregated progress metadata for a category or the entire collection.

- `tagName`: String
- `totalWords`: Number
- `masteredWords`: Number (Box 5)
- `learningWords`: Number (Boxes 1-4)
- `boxDistribution`:
  - `1`: Number
  - `2`: Number
  - `3`: Number
  - `4`: Number
  - `5`: Number

## Transient States

### LevenshteinResult

Temporary calculation result for the typo helper.

- `distance`: Number
- `isTypo`: Boolean (True if distance == 1)
- `isMatch`: Boolean (True if distance == 0)
