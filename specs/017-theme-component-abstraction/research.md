# Research & Technical Decisions: Theme Component Abstraction

## Component Audit Findings

### Hardcoded Themes vs. Abstractions

- **Button.tsx**: Currently has a mix of zinc-based and playful colors. "Primary" variant uses hardcoded `blue-600`. Others use zinc-100/zinc-800.
- **Input.tsx**: Uses `bg-white` and `dark:bg-zinc-950`. This is good but could be further abstracted.
- **VocabularyList.tsx**: Uses `bg-white dark:bg-zinc-900` and `border-zinc-100 dark:border-zinc-800`.
- **Card-like elements**: Many elements (Vocabulary items, stats cards) share similar background/border patterns but are not unified.

### Missing Abstractions

- **Card**: A standard `Card` component is missing. Page elements manually apply `border-2 rounded-[24px] bg-white dark:bg-zinc-900`.
- **Badge/Tag**: Tags are manually styled in multiple places (`VocabularyList`, `WordDetail`).
- **Typography**: Headers and captions are inconsistent. Some use `text-zinc-400 font-bold uppercase tracking-widest text-xs`, others use slightly different variations.

## Decisions

- **Decision**: Create a base `Card` component.
- **Rationale**: Standardize the container style (background, border, shadow) across the app. This makes theme maintenance easier.
- **Decision**: Create a `Badge` component.
- **Rationale**: Unify the styling of tags and status indicators.
- **Decision**: Create a `Typography` or standard `Header/Subheader` components.
- **Rationale**: Ensure consistent spacing and font styles for semantic sections.
- **Decision**: Standardize semantic color usage in Tailwind.
- **Rationale**: Use CSS variables for `card-bg`, `card-border`, `muted-text` instead of raw zinc shades in every file.

## Alternatives Considered

- **Using a UI Library (e.g., shadcn/ui)**: Rejected to maintain the "playful" custom aesthetic of the project. We will instead build a mini-library within `src/components/ui/` that follows our specific design language.
- **Global CSS Utility Classes**: Rejected in favor of React components for better discoverability and encapsulation of logic (like Framer Motion animations).
