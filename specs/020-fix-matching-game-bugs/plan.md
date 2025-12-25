# Implementation Plan: Matching Game Refinements & Bug Fixes

**Branch**: `020-fix-matching-game-bugs` | **Date**: 2025-12-25 | **Spec**: `specs/020-fix-matching-game-bugs/spec.md`
**Input**: Feature specification from `/specs/020-fix-matching-game-bugs/spec.md`

## Summary

Refine the "Connect Pairs" practice mode by ensuring matched items remain on screen with a faded green style, isolating error feedback to only the selected items, and fixing the "Play again" functionality. The implementation focuses on state management in `MatchingGame.tsx` and routing logic in `PracticePage.tsx`.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, Framer Motion, Lucide React  
**Storage**: LocalStorage (existing repo logic)  
**Testing**: Vitest + Manual Visual Audit  
**Target Platform**: Web (Mobile-first)
**Project Type**: single project
**Performance Goals**: <200ms session restart, 60fps animations  
**Constraints**: Zero dark mode regressions, no unreadable text in faded state.  
**Scale/Scope**: `MatchingGame.tsx`, `PracticePage.tsx`, `SessionSummary.tsx`.

## Constitution Check

- **I. Engineering Excellence**: Pass.
- **II. Maintainability and Extensibility**: Pass. Standardizing session config capture.
- **III. User-Centric Design**: Pass. Better visual context and focused error feedback.
- **IV. Performance and Scalability**: Pass. Lightweight state updates.
- **V. Version Control Discipline**: Pass. Atomic changes for each requirement.
- **VI. Pragmatic Testing**: Pass. Focus on interaction loops.
- **VII. Strict Linting & Formatting**: Pass.
- **VIII. Strong Typing Discipline**: Pass.
- **IX. Modern Coding Style**: Pass.

## Project Structure

### Documentation (this feature)

```text
specs/020-fix-matching-game-bugs/
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
│       └── page.tsx     # Fix "Play again" routing
├── components/
│   └── practice/
│       ├── MatchingGame.tsx # Fix persistence & error highlighting
│       └── SessionSummary.tsx # Verify button callback
```

**Structure Decision**: Targeted fixes in existing practice components. No new files required.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
