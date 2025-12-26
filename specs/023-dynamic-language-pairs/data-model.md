# Data Model: Dynamic Language Pair Selection

## Entities

### UserSettings (Update)

Represents the user's application preferences and learning state.

| Field | Type | Description |
|-------|------|-------------|
| sourceLanguage | `string` | The user's native or reference language (e.g., 'English'). |
| targetLanguage | `string` | The language the user is learning (e.g., 'Spanish'). |
| languagePairSelected | `boolean` | Flag to track if onboarding is complete. |

## Keyboard Mapping

```typescript
const DIACRITICS: Record<string, string[]> = {
  'German': ["ä", "ö", "ü", "ß"],
  'Czech': ["á", "č", "ď", "é", "ě", "í", "ň", "ó", "ř", "š", "ť", "ú", "ů", "ý", "ž"],
  'Spanish': ["á", "é", "í", "ó", "ú", "ü", "ñ"],
  'French': ["à", "â", "æ", "ç", "é", "è", "ê", "ë", "î", "ï", "ô", "œ", "ù", "û", "ü", "ÿ"],
  'Italian': ["à", "è", "é", "ì", "ò", "ó", "ù"],
  'English': []
};
```
