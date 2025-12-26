# Quickstart & Test Scenarios: Dynamic Language Pairs

## Development Workflow

1. Clear LocalStorage to trigger onboarding.
2. Select English -> Spanish.
3. Go to Generator, type "Food", click Generate.
4. Verify results are in Spanish/English.
5. Go to Practice, verify virtual keyboard shows Spanish diacritics (ñ, á, etc.).

## Manual Test Scenarios

### TS-001: Onboarding Block
- **Setup**: Clear LocalStorage.
- **Action**: Open `/`.
- **Expected**: "Welcome! Choose your languages" screen is shown. Main dashboard is invisible.

### TS-002: Validation
- **Action**: Select "English" for both Source and Target.
- **Expected**: "Start" button is disabled or an error message appears.

### TS-003: AI Prompt Correctness
- **Setup**: Select German -> Italian.
- **Action**: Generate 5 words for "City".
- **Expected**: Response contains Italian words with German translations.

### TS-004: Keyboard Adaptivity
- **Setup**: Select English -> German.
- **Action**: Enter Trainer session.
- **Expected**: Keyboard shows ä, ö, ü, ß.
