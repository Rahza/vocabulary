# Implementation Plan: Theme Component Abstraction & Standardization

**Branch**: `017-theme-component-abstraction` | **Date**: 2025-12-25 | **Spec**: `specs/017-theme-component-abstraction/spec.md`
**Input**: Feature specification from `/specs/017-theme-component-abstraction/spec.md`

## Summary

This feature involves abstracting core UI elements into reusable, theme-aware components in `src/components/ui/`. We will create standard `Card`, `Badge`, and `Heading` components to replace hardcoded styles across the application, ensuring 100% consistency in dark and light modes.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, Framer Motion, Lucide React, `next-themes`  
**Storage**: N/A (UI refactor)  
**Testing**: Vitest + Manual visual regression  
**Target Platform**: Web (App Router)
**Project Type**: Single project  
**Performance Goals**: Zero increase in bundle size; improved component re-render performance through standardized abstraction.  
**Constraints**: Must strictly follow the playful design language (large radii, vibrant colors). No use of external UI libraries like MUI or Shadcn.  
**Scale/Scope**: All pages in `src/app/` and components in `src/components/`.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: Pass. Standardizing UI components is a best practice for scalability.
- **II. Maintainability and Extensibility**: Pass. Centralizing UI logic makes it much easier to change the look and feel globally.
- **III. User-Centric Design**: Pass. Ensures consistent accessibility and aesthetic.
- **IV. Performance and Scalability**: Pass. Reducse code duplication.
- **V. Version Control Discipline**: Pass. Incremental refactoring of components and then usage in pages.
- **VI. Pragmatic Testing**: Pass. Visual validation and unit tests for component props.
- **VII. Strict Linting & Formatting**: Pass. Following project ESLint rules.
- **VIII. Strong Typing Discipline**: Pass. Defining strict prop interfaces in `data-model.md`.
- **IX. Modern Coding Style**: Pass. Using arrow functions and functional patterns.

## Project Structure

### Documentation (this feature)

```text
specs/017-theme-component-abstraction/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/              # NEW and Updated components
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Heading.tsx
│   │   └── ...
│   ├── vocabulary/      # Refactored to use UI components
│   ├── dashboard/       # Refactored to use UI components
│   └── ...
└── app/                 # Refactored pages
```

**Structure Decision**: We will keep the `src/components/ui/` directory as the source of truth for base components. All feature-specific components will import from there.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
