# Data Model: Restyle Light Mode

## Entities

### ThemeConfiguration (Update)

Represents the visual state of the application.

| Field           | Type     | Description                     |
| --------------- | -------- | ------------------------------- |
| appBackground   | `string` | Main app background color.      |
| appForeground   | `string` | Main text color.                |
| cardBackground  | `string` | Background color for cards.     |
| cardBorder      | `string` | Border color for cards.         |
| cardShadow      | `string` | Shadow configuration for cards. |
| inputBackground | `string` | Background color for inputs.    |
| ...             | ...      | Other UI-related variables.     |

## Mappings

### Light Mode CSS Variables (Proposed)

| Variable           | Value (Proposed)                       | Description                |
| ------------------ | -------------------------------------- | -------------------------- |
| `--app-background` | `#ffffff`                              | Clean white.               |
| `--app-foreground` | `#09090b`                              | High contrast text.        |
| `--card-shadow`    | `0 10px 15px -3px rgba(0, 0, 0, 0.05)` | Soft shadow.               |
| `--card-border`    | `rgba(228, 228, 231, 0.5)`             | zinc-200 with 50% opacity. |
