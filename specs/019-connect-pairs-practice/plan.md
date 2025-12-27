# Implementation Plan: Connect Pairs Practice Mode

**Branch**: `019-connect-pairs-practice` | **Date**: 2025-12-25 | **Spec**: `specs/019-connect-pairs-practice/spec.md`
**Input**: Feature specification from `/specs/019-connect-pairs-practice/spec.md`

## Summary

Add a new interactive "Connect Pairs" mode to the practice tab. This mode allows users to match German and Czech word pairs in a grid layout. The implementation will focus on smooth Framer Motion animations, a 2-column randomized layout, and an independent practice logic that does not affect Leitner progress. The existing classic practice mode will be preserved through a new mode selection screen.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, Framer Motion, Lucide React, `sonner`  
**Storage**: N/A (Pure Practice - no persistent state update)  
**Testing**: Vitest + Manual Visual Audit  
**Target Platform**: Web (Mobile-first)
**Project Type**: Single project
**Performance Goals**: 60fps animations, <300ms round transitions  
**Constraints**: Exactly 5 pairs per screen, zero Leitner progress updates.  
**Scale/Scope**: Practice tab refactor + new `MatchingGame` component.

## Constitution Check

- **I. Engineering Excellence**: Pass. Standard interaction patterns and modular component design.
- **II. Maintainability and Extensibility**: Pass. Mode selection allows adding more practice types later.
- **III. User-Centric Design**: Pass. High interactivity and clear visual feedback.
- **IV. Performance and Scalability**: Pass. Lightweight local state management.
- **V. Version Control Discipline**: Pass. Atomic commits for mode selection, component, and integration.
- **VI. Pragmatic Testing**: Pass. Manual verification of matching logic and layout.
- **VII. Strict Linting & Formatting**: Pass. No rule suppression.
- **VIII. Strong Typing Discipline**: Pass. Explicit interfaces for matching state and entities.
- **IX. Modern Coding Style**: Pass. Mandatory arrow functions for components.

## Project Structure

### Documentation (this feature)

```text
specs/019-connect-pairs-practice/
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
│   └── practice/        # Updated PracticePage with mode selection
├── components/
│   ├── practice/        # New MatchingGame component
│   └── ui/              # Reusable Card/Heading components
└── lib/
    └── shuffle.ts       # Utility for shuffling pairs
```

**Structure Decision**: Single project structure. We will refactor `src/app/practice/page.tsx` to handle mode selection and host the new `MatchingGame` component.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
