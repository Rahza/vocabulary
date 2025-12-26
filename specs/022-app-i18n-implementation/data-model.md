# Data Model: Application i18n

## Entities

### UserSettings (Update)

Represents the user's application preferences.

| Field    | Type                   | Description                  | Validation                                |
| -------- | ---------------------- | ---------------------------- | ----------------------------------------- |
| language | `'en' \| 'de' \| 'cs'` | The active UI language code. | Must be one of the three supported codes. |

### Translation Keys

The application strings will be organized by namespace:

- `common`: Buttons like "Back", "Save", "Cancel".
- `dashboard`: Strings for the home screen.
- `vocabulary`: Strings for the list and management.
- `trainer`: Strings for the SRS session.
- `practice`: Strings for the practice modes.
- `settings`: Strings for the options page.

## State Transitions

1. **First Load**:
   - Middleware detects browser language.
   - If language is supported, set as `locale`.
   - If not, default to `en`.
2. **User Manual Change**:
   - User selects new language in Settings.
   - `updateSettings({ language: '...' })` is called.
   - Cookie is updated.
   - UI re-renders with new translations via `next-intl`.
