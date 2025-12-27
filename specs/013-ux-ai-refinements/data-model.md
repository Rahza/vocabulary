# Data Model: Refinements

The core data models remain stable. This feature introduces transient state structures for session management.

## Transient States

### PracticeSettings

Metadata used to initialize a study session.

- `tag`: String
- `length`: Number (5, 10, 20, or Infinity for "All")

### UIState (Generator)

- `phase`: 'form' | 'loading' | 'results'
- `transition`: Defines the flow from `results` back to `form` after save/discard.
