# Implementation Plan: Fix Vocab Bugs & Improve UX

**Branch**: `002-fix-vocab-bugs` | **Date**: 2025-12-25 | **Spec**: [Link](spec.md)
**Input**: Feature specification from `/specs/002-fix-vocab-bugs/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature addresses critical usability issues and bugs:
1.  **Virtual Keyboard**: Fixing the character set to be exclusively Czech (removing German umlauts).
2.  **Learning Algorithm**: Implementing a "smart shuffle" that prevents immediate repetition of the same word.
3.  **UX Polish**: Replacing blocking `alert()` calls with non-intrusive Toast notifications using `sonner`.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: `sonner` (New), Next.js, React, Tailwind CSS  
**Storage**: LocalStorage (Unchanged)  
**Testing**: Jest (for shuffle logic)  
**Target Platform**: Mobile Web  
**Project Type**: SPA  
**Performance Goals**: Shuffle algorithm must be <10ms for 100 items.  
**Constraints**: Keep it client-side.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: ✅ Using `sonner` avoids reinventing the wheel. Shuffle logic will be pure function, easily testable.
- **II. Maintainability and Extensibility**: ✅ Shuffle logic isolated in `src/lib/shuffle.ts`.
- **III. User-Centric Design**: ✅ Removing blocking alerts and fixing keyboard significantly improves flow.
- **IV. Performance and Scalability**: ✅ Greedy shuffle is efficient for expected list sizes.

## Project Structure

### Documentation (this feature)

```text
specs/002-fix-vocab-bugs/
├── plan.md              # This file
├── research.md          # Decisions
├── data-model.md        # No changes
└── tasks.md             # Tasks
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/
│   ├── layout.tsx       # Add <Toaster />
│   ├── generate/        # Replace alert()
│   ├── settings/        # Replace alert()
│   ├── trainer/         # Use smart shuffle
│   └── practice/        # Use smart shuffle
├── components/
│   └── keyboard/
│       └── VirtualKeyboard.tsx # Fix chars
└── lib/
    └── shuffle.ts       # New smart shuffle logic
```

**Structure Decision**: Standard Next.js structure. Adding a utility library for the algorithm.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | | |
