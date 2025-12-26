# Quickstart & Test Scenarios: Matching Refinements

## Setup

1. Navigate to `/practice`.
2. Select "Paare finden" (Connect Pairs).
3. Choose 1 or more tags and a round count.
4. Click "Sitzung starten".

## Manual Test Scenarios

### TS-001: Correct Match Persistence

- **Action**: Select a German word and its correct Czech translation.
- **Expected**: The words do NOT disappear. They become translucent (faded) and gain a green background. They are no longer clickable.

### TS-002: Error Feedback Isolation

- **Action**: Select a German word and an INCORRECT Czech translation.
- **Expected**: ONLY these two specific cards shake and turn red. No other cards (especially the actual correct ones) should change state.

### TS-003: Play Again (Connect Pairs)

- **Action**: Complete a Connect Pairs session.
- **Action**: On the summary screen, click "Nochmal!".
- **Expected**: The game restarts immediately with the same tags and round count.

### TS-004: Play Again (Classic)

- **Action**: Complete a Classic session.
- **Action**: On the summary screen, click "Nochmal!".
- **Expected**: The game restarts with the same tag and question count.
