# Quickstart & Test Scenarios: Connect Pairs

## Setup for Development

1. Navigate to `/practice`.
2. Select "Connect Pairs".
3. Choose tags and "5 questions".
4. Click "Start".

## Manual Test Scenarios

### TS-001: Correct Match Feedback

- **Action**: Tap a German word, then its correct Czech counterpart.
- **Expected**: Both cards turn green (success state) and are either disabled or removed.

### TS-002: Incorrect Match Feedback

- **Action**: Tap a German word, then an incorrect Czech counterpart.
- **Expected**: Both cards turn red, shake, and then return to their original state after a short delay (e.g., 500ms).

### TS-003: Round Completion

- **Action**: Match all 5 pairs on the screen.
- **Expected**: Round transition occurs within 300ms, and the next set of words is displayed.

### TS-004: Pure Practice Verification

- **Action**: Complete a full session.
- **Expected**: Vocabulary remains in the same Leitner boxes as before (verify in "Sammlung").

### TS-005: Responsive Layout

- **Action**: Open the matching screen on a mobile device or resize browser to mobile width.
- **Expected**: 10 word cards (2x5 grid) are easily tappable without overlapping.
