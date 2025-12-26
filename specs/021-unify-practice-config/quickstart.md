# Quickstart & Test Scenarios: Unified Configuration

## Setup

1. Open Practice tab.
2. Select "Klassisch".
3. Verify multi-tag selection works.
4. Verify "Zurück" button works.
5. Start session and verify "Beenden" button exists.

## Manual Test Scenarios

### TS-001: Multi-Tag Classic Practice

- **Action**: Select "Classic" mode, select 2 tags, set length to 5.
- **Expected**: Words from both tags are included in the 5-item session.

### TS-002: Unified Terminology

- **Action**: Open config for "Connect Pairs".
- **Expected**: "Anzahl der Runden" or "Sitzungslänge" is displayed consistently with "Classic" mode.

### TS-003: Session Exit (Classic)

- **Action**: Start a Classic session, click "Beenden".
- **Expected**: Session stops immediately and returns to mode selection.
