# Implementation Plan: Auth UI Redesign

**Branch**: `027-auth-ui-redesign` | **Date**: 2025-12-26 | **Spec**: [specs/027-auth-ui-redesign/spec.md]

## Summary
Redesign the sign-in and sign-up screens to match the application's "playful" design language by replacing custom Tailwind styles with standard UI components (`Card`, `Heading`, `Button`, `Input`) and project-wide animations.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, Framer Motion, Lucide React, Tailwind CSS v4  
**Storage**: N/A (UI-only change)  
**Testing**: Vitest (Component testing)  
**Target Platform**: Web (Mobile-first)
**Project Type**: Single project
**Performance Goals**: Maintaining zero layout shifts during transition; snappy animations (<300ms)
**Constraints**: Must strictly use components from `src/components/ui`
**Scale/Scope**: 2 pages (`login`, `signup`)

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: ✅ Promotes component reuse and dry principles.
- **II. Maintainability and Extensibility**: ✅ Using UI components makes future design tweaks centralized.
- **III. User-Centric Design**: ✅ Consistent design improves user trust and onboarding flow.
- **IV. Performance and Scalability**: ✅ Standard components are optimized for Next.js.
- **V. Version Control Discipline**: ✅ Commits will be split by page (login/signup).
- **VI. Pragmatic Testing**: ✅ Visual/component checks will ensure alignment.
- **VII. Strict Linting & Formatting**: ✅ Adheres to project ESLint configuration.
- **VIII. Strong Typing Discipline**: ✅ No `any` types used in component props.
- **IX. Modern Coding Style**: ✅ Mandatory arrow functions for redesigned components.

## Project Structure

### Documentation (this feature)

```text
specs/027-auth-ui-redesign/
├── plan.md              # This file
├── research.md          # Alignment with design system
├── data-model.md        # N/A (no data changes)
├── quickstart.md        # Visual audit guide
└── tasks.md             # Implementation steps
```

### Source Code (repository root)

```text
src/
├── app/
│   └── [locale]/
│       └── (auth)/
│           ├── login/
│           │   └── page.tsx # Redesigned
│           └── signup/
│               └── page.tsx # Redesigned
└── components/
    └── ui/                  # Source of truth for styles
```

**Structure Decision**: Localized authentication pages within the Next.js App Router structure.

## Complexity Tracking