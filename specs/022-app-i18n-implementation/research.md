# Research & Technical Decisions: Application i18n

## i18n Framework

- **Decision**: Use `next-intl` for i18n.
- **Rationale**: It provides first-class support for Next.js App Router, is highly performant, and offers excellent type safety for translation keys. It aligns with the project's goal of using modern, industry-standard technologies.
- **Alternatives Considered**:
  - **Custom React Context**: Lightweight but lacks advanced features like pluralization, number/date formatting, and community support.
  - **i18next**: Extremely powerful but significantly more complex to set up correctly with Next.js App Router and server components.

## Language Detection & Switching

- **Decision**: Use a middleware-based approach for language detection and sync it with `SettingsContext`.
- **Rationale**: `next-intl` handles language detection via middleware or cookie/header. We will prioritize the user's saved preference in `LocalStorage` (sync'd to a cookie for the middleware) and fall back to the `Accept-Language` header.
- **Switching**: Language switching will update the `SettingsContext` and the cookie, allowing `next-intl` to re-render the UI instantly.

## Localization (Dates & Numbers)

- **Decision**: Use the native `Intl` browser API combined with `next-intl` formatters.
- **Rationale**: Lightweight, no extra dependencies (like `moment` or `dayjs`), and perfectly supports the requested languages (en, de, cz).

## Project Structure Changes

- **Decision**: Move the current `src/app` content into `src/app/[locale]` to support `next-intl`'s preferred routing pattern.
- **Rationale**: This is the standard way to implement i18n in Next.js App Router, enabling both static and dynamic rendering with locale support.
- **Fallback**: A root-level middleware will redirect `/` to `/[system-language]`.
