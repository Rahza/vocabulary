# Research & Technical Decisions: Light & Dark Mode Implementation

## Theme Management

- **Decision**: Replace custom `SettingsContext` theme logic with `next-themes`.
- **Rationale**: `next-themes` is the industry standard for Next.js. It handles system theme synchronization perfectly, avoids FOUC (Flash of Unstyled Content) by using a blocking script in the head, and manages the `dark` class on the `html` element reliably.
- **Alternatives Considered**: Keeping custom logic in `SettingsContext`. Rejected because custom logic is prone to hydration mismatches and FOUC.

## Styling (Tailwind CSS v4)

- **Decision**: Use `class` based dark mode.
- **Rationale**: Allows toggling via a CSS class on the `html` element. Tailwind v4 supports this out of the box.
- **Design Strategy**:
  - Use `bg-white dark:bg-zinc-900` for cards and components.
  - Use `bg-gray-50 dark:bg-zinc-950` for page backgrounds.
  - Ensure all text uses `text-zinc-900 dark:text-zinc-50` or appropriate zinc shades.
  - Standardize border colors to `border-zinc-100 dark:border-zinc-800`.

## FOUC Prevention

- **Decision**: Utilize `next-themes` `ThemeProvider` with `enableSystem={true}`, `attribute="class"`, and `defaultTheme="system"`.
- **Rationale**: This injects a small script that runs before React hydrates, ensuring the correct theme is applied instantly based on user preference or system setting.

## Persistence

- **Decision**: Use `next-themes` built-in persistence (LocalStorage).
- **Rationale**: Simplifies the codebase by offloading theme persistence to a specialized library. We will keep `theme` in `UserSettings` type for consistency but sync it with `next-themes`.

## UI/UX Refinement

- **Decision**: Audit all components for light mode visibility.
- **Rationale**: Some components might have been designed primarily for dark mode and lack sufficient contrast in light mode.
- **Action**: Verify `ThemeSelector`, `VocabularyList`, `Navigation`, and `Flashcard` components specifically.
