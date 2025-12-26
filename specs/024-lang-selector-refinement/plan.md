# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, `next-intl`, `next-themes`, Framer Motion, Lucide React, `sonner`
**Storage**: LocalStorage (via `LocalStorageRepository`), Cookie (for middleware)
**Testing**: Vitest (Unit/Component testing)
**Target Platform**: Web (Next.js App Router)
**Project Type**: Web Application
**Performance Goals**: <100ms interaction latency, instant page loads (static/client-side)
**Constraints**: Offline-first, strict typing, fully localized
**Scale/Scope**: < 1000 vocabulary items (typically), single user per device

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: Refactoring to generic types significantly improves code quality and semantics.
- **II. Maintainability and Extensibility**: Removing hardcoded language references allows easy addition of new languages.
- **III. User-Centric Design**: Localization and visual feedback (flags) improve accessibility and usability.
- **IV. Performance and Scalability**: Migration overhead is one-time and negligible for typical dataset sizes.
- **V. Version Control Discipline**: Atomic commits will be used for refactoring and feature work.
- **VI. Pragmatic Testing**: Unit tests will cover the critical data migration logic.
- **VII. Strict Linting & Formatting**: Project uses strict ESLint config.
- **VIII. Strong Typing Discipline**: `any` types will be eliminated in language handling; strict unions used.
- **IX. Modern Coding Style**: Functional components and hooks used throughout.

## Project Structure

### Documentation (this feature)

```text
specs/024-lang-selector-refinement/
├── plan.md              # This file
├── research.md          # Implementation decisions
├── data-model.md        # Updated data structures
├── quickstart.md        # Migration and testing guide
├── contracts/           # Service interface definitions
└── tasks.md             # Execution tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   └── [locale]/
│       ├── page.tsx               # Dashboard (updated)
│       └── layout.tsx             # Root layout with Onboarding
├── components/
│   ├── onboarding/
│   │   └── LanguageOnboarding.tsx # Main feature component
│   └── settings/
│       └── LanguageSelector.tsx   # Settings component (updated)
├── models/
│   └── types.ts                   # Updated interfaces
├── services/
│   └── storage/
│       └── LocalStorageRepository.ts # Migration logic
└── constants/
    └── languages.ts               # New generic constants
```

**Structure Decision**: Standard Next.js App Router structure with feature-based components and shared services.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
