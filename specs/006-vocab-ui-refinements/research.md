# Research: Vocabulary UI/UX Refinements

## 1. Information Density Optimization
**Status**: Resolved
**Decision**: Reduce card padding from `p-5` to `p-3` and font size for secondary metadata. Move mnemonics to a detail view.
**Rationale**: The current `p-5` (20px) padding creates too much whitespace for a management list. Moving the mnemonic aid (the largest secondary text block) to a detail view immediately recovers significant vertical space without losing educational value.
**Alternatives Considered**: 
- *Horizontal grid (2 columns)*: Rejected because German/Czech word pairs can be long and require full width for readability on mobile.

## 2. Word Detail Implementation
**Status**: Resolved
**Decision**: Implement a "Detail Drawer" using `framer-motion`.
**Rationale**: Drawers are more mobile-friendly than centered modals for single-item details. They allow the user to easily swipe down or click outside to return to the list, maintaining the "playful" and fluid feel of the app.
**Alternatives Considered**: 
- *Inline expansion (Accordion)*: Rejected as it pushes following items down, which is disorienting in a large list.

## 3. Checkbox Polish
**Status**: Resolved
**Decision**: Standardize selection UI by creating a dedicated `SelectionToggle` component. Align it center-vertically with the word pair text.
**Rationale**: Currently, the custom button is slightly misaligned with the text baseline. A dedicated component ensures consistency across the app.
**Alternatives Considered**: 
- *Standard HTML checkbox*: Rejected as it doesn't match the "playful" design system (large radii, custom colors).

## 4. Generator Entry Point
**Status**: Resolved
**Decision**: Add a secondary "Generate" button in the `SearchFilters` header or next to the search input.
**Rationale**: Putting it near the search/filter controls keeps it within the "context of managing" while keeping the primary page header clean.
