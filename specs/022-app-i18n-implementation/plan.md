# Implementation Plan: Application i18n Implementation

**Branch**: `022-app-i18n-implementation` | **Date**: 2025-12-25 | **Spec**: `specs/022-app-i18n-implementation/spec.md`
**Input**: Feature specification from `/specs/022-app-i18n-implementation/spec.md`

## Summary

Implement a full internationalization (i18n) system using `next-intl`. This involves moving the application to a locale-based routing structure (`/[locale]`), creating translation bundles for English, German, and Czech, and integrating language detection and switching into the existing `SettingsContext`. All hardcoded UI strings will be externalized, and dates/numbers will be localized using native `Intl` formatters.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, `next-intl`, Tailwind CSS v4, `next-themes`  
**Storage**: LocalStorage (via `SettingsContext`) + Cookie (for middleware)  
**Testing**: Vitest + Manual visual validation  
**Target Platform**: Web
**Project Type**: Web application
**Performance Goals**: Language switching < 100ms, zero FOUC during switching.  
**Constraints**: Zero hardcoded strings in components, 100% type safety for translation keys.

## Constitution Check

- **I. Engineering Excellence**: Pass. Using `next-intl` is an industry best practice for Next.js.
- **II. Maintainability and Extensibility**: Pass. Externalizing strings makes it easy to add new languages.
- **III. User-Centric Design**: Pass. Automatic detection and persistent settings improve UX.
- **IV. Performance and Scalability**: Pass. `next-intl` is optimized for App Router.
- **V. Version Control Discipline**: Pass. Incremental steps for infrastructure, then screen-by-screen translation.
- **VI. Pragmatic Testing**: Pass. Focus on switching logic and completeness of translations.
- **VII. Strict Linting & Formatting**: Pass. Adhering to project rules.
- **VIII. Strong Typing Discipline**: Pass. `next-intl` provides excellent type safety.
- **IX. Modern Coding Style**: Pass. Using functional components and modern i18n patterns.

## Project Structure

### Documentation (this feature)

```text
specs/022-app-i18n-implementation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code Changes

```text
src/
├── app/
│   ├── [locale]/        # NEW: Locale-wrapped routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ... (moved from app root)
│   ├── layout.tsx       # Root layout (redirects only)
│   └── middleware.ts    # Locale detection and routing
├── i18n/                # NEW: Configuration and formatters
│   ├── request.ts       # next-intl configuration
│   └── routing.ts       # Locale routing definitions
├── contexts/
│   └── SettingsContext.tsx # Updated to handle language
└── messages/            # NEW: JSON translation bundles
    ├── en.json
    ├── de.json
    └── cs.json
```

**Structure Decision**: Move to `src/app/[locale]` to leverage `next-intl`'s optimized routing. This is the recommended pattern for App Router i18n.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
