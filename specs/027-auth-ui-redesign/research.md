# Research: Auth UI Redesign

## Technical Decisions

### 1. Component Alignment
**Decision**: Replace all raw HTML tags and custom Tailwind classes in `login/page.tsx` and `signup/page.tsx` with standard project components: `Card`, `Heading`, `Button`, and `Input`.
**Rationale**: Adheres to the user request for design consistency and simplifies maintenance by using the established design system.

### 2. Animation Strategy
**Decision**: Use `containerReveal` for the main form wrapper and `itemReveal` for individual form elements (labels, inputs, buttons).
**Rationale**: Mimics the smooth, playful entry animations found on the Dashboard and Settings screens.

### 3. Styling Refinements
**Decision**: Remove hardcoded linear gradients (e.g., `from-playful-indigo to-playful-purple`) and replace them with standard utility classes or the `playful` variant of the `Button` component.
**Rationale**: Ensures that authentication screens do not drift from the overall application's visual language, which relies on solid colors and specific shadow/border patterns.

## Best Practices Found

- **Form Accessibility**: Ensure that while using the `Heading` component, the semantic structure (`h1`, `h2`) remains logical for screen readers.
- **Loading UX**: The `Button` component should maintain its `playful` dimensions and shadow even when showing the `Loader2` spinner.
- **Mobile First**: Centering the `Card` both vertically and horizontally using Flexbox ensures a consistent experience on all screen sizes.

## Unresolved Questions (Resolved)
- **Q**: Should we use the `Input` component?
- **A**: Yes, the project has an `Input` component (referenced in `WordDetail.tsx` and `SettingsPage.tsx`) which should be utilized for consistency.
