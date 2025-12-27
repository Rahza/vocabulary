# Implementation Plan: Unified Practice Configuration & UI Consistency

**Branch**: `021-unify-practice-config` | **Date**: 2025-12-25 | **Spec**: `specs/021-unify-practice-config/spec.md`
**Input**: Feature specification from `/specs/021-unify-practice-config/spec.md`

## Summary

Consolidate the practice configuration logic into a single, reusable `PracticeConfig` component. This component will support multi-tag selection and unified session length selection for both "Classic" and "Connect Pairs" modes. Additionally, UI consistency will be improved by adding navigation controls (Back buttons) and a session termination control (Beenden) to the Classic mode.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, Framer Motion, Lucide React  
**Storage**: N/A (UI and logic refactor)  
**Testing**: Manual Visual Audit, session parameter verification.  
**Target Platform**: Web (Mobile-first)
**Project Type**: single project
**Performance Goals**: <100ms UI transitions, efficient multi-tag vocabulary pooling.  
**Constraints**: terminological consistency ("Sitzungslänge"), zero loss of existing functionality.  
**Scale/Scope**: `PracticePage.tsx`, `PracticeConfig.tsx`, and removal of `TagSelector.tsx`.

## Constitution Check

- **I. Engineering Excellence**: Pass. Abstracting common logic into a single component reduces technical debt.
- **II. Maintainability and Extensibility**: Pass. Unified config makes it trivial to add future practice modes.
- **III. User-Centric Design**: Pass. Consistent navigation and multi-tag support.
- **IV. Performance and Scalability**: Pass. Lightweight pooling logic.
- **V. Version Control Discipline**: Pass. Atomic steps for abstraction and integration.
- **VI. Pragmatic Testing**: Pass. Focus on the core session loops.
- **VII. Strict Linting & Formatting**: Pass.
- **VIII. Strong Typing Discipline**: Pass. Explicit interfaces for session configs.
- **IX. Modern Coding Style**: Pass. Arrow functions and functional state.

## Project Structure

### Documentation (this feature)

```text
specs/021-unify-practice-config/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   └── practice/
│       └── page.tsx     # Integrate Unified Config & Beenden button
├── components/
│   └── practice/
│       ├── PracticeConfig.tsx # NEW (Refactored from ConnectPairsConfig)
│       └── (Remove TagSelector.tsx and ConnectPairsConfig.tsx)
```

**Structure Decision**: Refactor existing components into a single `PracticeConfig.tsx` to serve all modes.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
