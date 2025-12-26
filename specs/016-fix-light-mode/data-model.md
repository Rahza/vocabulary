# Data Model: Light & Dark Mode Implementation

## Entities

### UserSettings (Update)

Represents the user's application preferences.

| Field | Type                            | Description                                     | Validation                        |
| ----- | ------------------------------- | ----------------------------------------------- | --------------------------------- |
| theme | `'light' \| 'dark' \| 'system'` | The selected UI theme.                          | Must be one of the three options. |
| ...   | ...                             | Other existing fields (dailyGoal, openaiApiKey) | Unchanged.                        |

## Persistence

- **Mechanism**: LocalStorage
- **Key**: `ai_vocab_user_settings` (for general settings)
- **Theme Key**: `theme` (managed by `next-themes` in LocalStorage by default)

## State Transitions

1. **Initialization**:
   - `next-themes` script checks LocalStorage or system preference.
   - `html` class is set to `dark` or removed.
   - React hydrates and `SettingsContext` loads other settings.
2. **User Switch**:
   - User clicks a theme in `ThemeSelector`.
   - `setTheme` from `next-themes` is called.
   - `updateSettings` from `SettingsContext` is called (to keep sync if needed, though `next-themes` handles its own storage).
   - UI updates in real-time via CSS variables and Tailwind `dark:` classes.
3. **System Change**:
   - If theme is `system`, OS change triggers `next-themes` listener.
   - `html` class updates automatically.
