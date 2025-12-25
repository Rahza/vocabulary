# Quickstart & Integration: Theme Abstraction

## Development Workflow

1. **Component Creation**: All new base UI components must be placed in `src/components/ui/`.
2. **Prop Standards**: Follow the interfaces defined in `data-model.md`.
3. **Theme Application**: Use the standardized CSS variables or semantic Tailwind classes (e.g., `bg-white dark:bg-zinc-900`).

## Test Scenarios

### TS-001: Component Theme Audit
- **Action**: Render `Card`, `Badge`, and `Heading` components.
- **Action**: Toggle between light and dark modes.
- **Expected**: Backgrounds, borders, and text colors update instantly and follow the design system.

### TS-002: Consistency Check
- **Action**: Navigate to Dashboard, Vocabulary List, and Settings.
- **Expected**: All cards share the same border radius and border color. All tags use the `Badge` component. All section headers use the `Heading` component.

### TS-003: Refactor Validation
- **Action**: Replace hardcoded styles in `VocabularyList.tsx` with the new `Card` and `Badge` components.
- **Expected**: Visual appearance remains consistent, but the code is simplified and uses common components.
