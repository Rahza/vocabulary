# Implementation Plan: System Bug Fixes & UI Refinements

**Branch**: `008-fix-system-refinements` | **Date**: 2025-12-25 | **Spec**: [specs/008-fix-system-refinements/spec.md](spec.md)
**Input**: Feature specification from `/specs/008-fix-system-refinements/spec.md`

## Summary

This plan addresses a set of critical bug fixes and UI/UX refinements identified in the system. The main focus is on correcting the Trainer shuffling logic to ensure proper word distancing, fixing the Generator's discard flow to prevent blank screens, and improving UI state synchronization for mnemonic regeneration. Additionally, we will introduce a custom confirmation dialog to replace native alerts and improve the discoverability of tag management.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, OpenAI SDK, Framer Motion, Lucide React, Sonner  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library (`npm test`)  
**Target Platform**: Web  
**Project Type**: Single web application  
**Performance Goals**: UI reactive updates < 100ms, Shuffling algorithm distancing O(n)  
**Constraints**: 0 ESLint errors allowed, non-interactive test mode  
**Scale/Scope**: Maintenance and stabilization phase

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: [PASSED] This feature directly addresses codebase health (ESLint) and functional correctness (Trainer bugs).
- **II. Maintainability and Extensibility**: [PASSED] Refactoring prompts and UI sync logic makes the system more robust.
- **III. User-Centric Design**: [PASSED] Better shuffling and custom confirmation dialogs significantly improve UX.
- **IV. Performance and Scalability**: [PASSED] Shuffling distancing logic is designed to be efficient for typical vocabulary session sizes.

## Project Structure

### Documentation (this feature)

```text
specs/008-fix-system-refinements/
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
│   ├── vocabulary/      # Navigation to Tags
│   ├── generate/        # Fix blank screen after discard
│   └── trainer/         # Fix shuffling distancing and progress
├── components/
│   ├── vocabulary/      # Reactivity in WordDetail
│   ├── ui/              # New ConfirmDialog component
│   └── trainer/         # Shuffling logic updates
└── services/
    └── ai/              # Prompt refinement
```

**Structure Decision**: Standard feature-based structure within the existing Next.js App Router.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       |            |                                     |