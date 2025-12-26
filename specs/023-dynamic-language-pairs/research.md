# Research & Technical Decisions: Dynamic Language Pair Selection

## Diacritics Mapping

| Language | Characters |
|----------|------------|
| **German** | ä, ö, ü, ß |
| **Czech** | á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž |
| **Spanish** | á, é, í, ó, ú, ü, ñ |
| **French** | à, â, æ, ç, é, è, ê, ë, î, ï, ô, œ, ù, û, ü, ÿ |
| **Italian** | à, è, é, ì, ò, ó, ù |
| **English** | (None) |

## Onboarding Flow

- **Decision**: Create a `LanguageOnboarding` component that blocks the main application if `sourceLanguage` or `targetLanguage` is missing in `UserSettings`.
- **Rationale**: Ensures the user selects their learning pair before anything else.
- **Trigger**: `SettingsContext` will expose an `isOnboarded` flag.

## AI Prompt Integration

- **Decision**: Update `IAIService` methods to accept `sourceLanguage` and `targetLanguage` names.
- **Rationale**: Prompts currently hardcode "German" and "Czech". These must be dynamic.
- **Implementation**: The prompt will be interpolated: `Generate ${requestCount} ${sourceLanguage}-${targetLanguage} vocabulary pairs...`.

## Virtual Keyboard

- **Decision**: Modify `VirtualKeyboard` to take the current `targetLanguage` as a prop and use a lookup table for `CHARS`.
- **Rationale**: Provides only the necessary diacritics for the language being practiced.

## Persistence & Reset

- **Decision**: Use the existing "Reset All Data" functionality in `SettingsPage` to handle language changes.
- **Rationale**: Simplifies implementation by leveraging the "reset" constraint mentioned in the requirements.
