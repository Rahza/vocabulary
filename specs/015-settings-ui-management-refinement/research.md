# Research: Settings, Input & Management UI Refinements

## 1. Theme Management (Light/Dark/System)
**Status**: Resolved
**Decision**: Implement a class-based toggle system in `SettingsContext.tsx` using `document.documentElement`.
**Rationale**: The app uses Tailwind 4 with CSS variables. By applying a `.dark` class to the root element, we can easily override variables for colors.
**Implementation**: 
- `SettingsContext.tsx` will have a `useEffect` that listens to `settings.theme`.
- If 'system', use `window.matchMedia('(prefers-color-scheme: dark)')`.
- Update `globals.css` to wrap dark-specific variables in `.dark` instead of `@media (prefers-color-scheme: dark)`.

## 2. Autocomplete Removal
**Status**: Resolved
**Decision**: Set `autoComplete="off"` as the default prop in `src/components/ui/Input.tsx`.
**Rationale**: This ensures a consistent, focused typing experience across all fields (Translation, Theme, Search) without manual attribute repetitive application.

## 3. Management UI Density
**Status**: Resolved
**Decision**: Redesign the header into a more compact horizontal bar.
**Rationale**: The current management page header and filter stack take up too much vertical space on mobile.
**Implementation**: 
- Move "Neu generieren" and "Tags verwalten" into a secondary action row or a combined header bar.
- Use smaller padding (`p-2` vs `p-4`) for filter controls.

## 4. Empty State Standardization
**Status**: Resolved
**Decision**: Create a reusable `EmptyState` component.
**Rationale**: Ensures consistency across Vocabulary, Tags, and Trainer views when counts are zero.
**Implementation**:
- Props: `title`, `description`, `icon`, `action` (optional button).
