# Data Model: I18n & Logic Fixes

## Firestore Indexing Requirements

To support the "Learn" mode (Trainer) logic, the following composite indexes are required in Cloud Firestore.

### 1. Due Review Retrieval
This index supports the server-side filtering and sorting of vocabulary items due for review.

- **Collection**: `leitner` (subcollection under `users/{uid}`)
- **Fields**:
  - `nextReview` (ASC)
  - `__name__` (ASC) (Implicit)

*Note: Since the query is scoped to a specific user's subcollection, Firestore requires this index to handle the range filter and sort on the same field.*

### 2. Tag Filtering (Existing)
- **Collection**: `vocabulary`
- **Fields**:
  - `tags` (Array Contains)

## Localization Entities

UI strings are managed as JSON key-value pairs. All languages must maintain parity with the following top-level keys:

- `common`: Shared buttons and labels.
- `auth`: Authentication screens.
- `navigation`: Bottom menu labels.
- `dashboard`: Home screen stats and links.
- `onboarding`: First-time setup.
- `settings`: Preferences and account management.
- `vocabulary`: Collection management.
- `trainer`: Learning session UI.
- `practice`: Custom session UI.
- `tags`: Tag management.
- `generator`: AI creation UI.
