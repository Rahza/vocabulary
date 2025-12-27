# Quickstart & Test Scenarios: Application i18n

## Setup for Development

1. Install dependencies: `npm install next-intl`
2. Create `messages/` directory at root.
3. Add `en.json`, `de.json`, `cs.json`.
4. Configure `middleware.ts` and `src/i18n/request.ts`.
5. Wrap root layout with `NextIntlClientProvider` (if needed for client components).

## Manual Test Scenarios

### TS-001: Automatic Detection

- **Setup**: Set browser language to "Deutsch".
- **Action**: Open app for the first time.
- **Expected**: UI is in German.

### TS-002: Dynamic Switching

- **Setup**: App is in English.
- **Action**: Go to Settings, select "Čeština".
- **Expected**: UI instantly updates to Czech.

### TS-003: Persistence

- **Setup**: App is set to German.
- **Action**: Refresh the page.
- **Expected**: UI remains in German.

### TS-004: Date Localization

- **Action**: View a date (e.g., "Created at" in Vocabulary detail).
- **Expected**: Format matches language (e.g., `25.12.2025` for German, `12/25/2025` for English).
