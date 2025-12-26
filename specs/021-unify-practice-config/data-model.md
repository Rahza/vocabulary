# Data Model: Unified Practice Configuration

## Entities

### SessionConfig
Represents the state used to start any practice session.

| Field | Type | Description |
|-------|------|-------------|
| mode | `PracticeMode` | 'classic' \| 'connect-pairs' |
| selectedTags | `string[]` | Array of tag names to include. |
| sessionLength | `number` | Total items (classic) or rounds (matching). |

## Component Props

### PracticeConfig
The unified configuration UI.

| Prop | Type | Description |
|------|------|-------------|
| mode | `PracticeMode` | Determines variant-specific text (e.g., info labels). |
| onStart | `(tags: string[], length: number) => void` | Callback to launch the session. |
| onBack | `() => void` | Callback to return to mode selection. |
