# Data Model: Settings & UI Refinements

This feature leverages existing models but refines the configuration and UI property structures.

## Entities

### UserSettings (Refinement)

- `theme`: 'light' | 'dark' | 'system' (Required)
- `openaiApiKey`: String (Optional)

## Transient UI Props

### EmptyStateProps

- `title`: String
- `description`: String
- `icon`: Lucide Icon Name
- `action`: { label: String, onClick: Function }
