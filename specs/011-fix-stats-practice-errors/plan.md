# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan addresses two critical regressions: a runtime `ReferenceError` on the Practice page and a visual bug in the dashboard's progress distribution chart. We will restore the missing animation variant imports in `PracticePage` and correct the CSS/Framer Motion logic in the `ProgressDistribution` component to ensure Leitner box bars have a relative, visible height.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS, Framer Motion, Lucide React  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library  
**Target Platform**: Web  
**Project Type**: Single web application  
**Performance Goals**: Instant UI rendering, smooth animations  
**Constraints**: 0 runtime errors, visible data visualizations  
**Scale/Scope**: Stabilization of existing UI components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: [PASSED] Fixing runtime errors and visual bugs directly supports high-quality software standards.
- **II. Maintainability and Extensibility**: [PASSED] Ensuring proper imports and shared animations improves maintainability.
- **III. User-Centric Design**: [PASSED] Functional pages and clear progress feedback are essential for a positive user experience.
- **IV. Performance and Scalability**: [PASSED] Correcting CSS/Motion logic for visualizations ensures performance without degradation.

## Project Structure

### Documentation (this feature)

```text
specs/011-fix-stats-practice-errors/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   └── practice/        # Fix ReferenceError (containerReveal)
├── components/
│   └── dashboard/       # Fix ProgressDistribution bar heights
└── lib/
    └── animations.ts    # Verify exported variants
```

**Structure Decision**: Maintenance of existing Next.js App Router structure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
