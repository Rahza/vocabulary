# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature addresses two critical issues: usability of the Tag Manager on small screens and inaccuracy in the dashboard's total vocabulary count. We will redesign the Tag Manager's layout to be fully responsive, switching to a single-column view on mobile. Additionally, we will audit and fix the statistics aggregation logic in the repository to ensure unique vocabulary items are counted correctly, avoiding double-counting from multiple review directions.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS, Framer Motion, Lucide React  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library  
**Target Platform**: Web (Responsive)  
**Project Type**: Single web application  
**Performance Goals**: Instant UI updates, accurate aggregation  
**Constraints**: Tailwind responsive breakpoints (sm: 640px)  
**Scale/Scope**: Maintenance and bug fix

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: [PASSED] Fixing inaccurate stats directly supports data integrity and software quality.
- **II. Maintainability and Extensibility**: [PASSED] Improving responsive layout ensures the UI remains usable as the feature set grows.
- **III. User-Centric Design**: [PASSED] Mobile-first usability is a core user need.
- **IV. Performance and Scalability**: [PASSED] Accurate aggregation logic is essential for correctly reflecting collection growth.

## Project Structure

### Documentation (this feature)

```text
specs/010-fix-ui-stats-bugs/
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
│   ├── tags/            # Responsive layout fix
│   └── page.tsx         # Verify total count display
├── components/
│   ├── tags/
│   │   └── TagList.tsx  # Redesign grid for mobile
│   └── dashboard/
│       └── StatsOverview.tsx # Verify stats mapping
└── services/
    └── storage/
        └── LocalStorageRepository.ts # Fix getStats logic
```

**Structure Decision**: Maintenance of existing Next.js App Router structure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
