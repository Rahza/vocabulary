# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature focuses on improving the Tag Manager's usability and gamifying the progress visualization. We will redesign the Tag Manager to use a single-column layout, ensuring tag names are clearly visible and action buttons are accessible on all screen sizes. Additionally, we will replace the boring numbered "boxes" with a descriptive, playful naming scheme (🌱 Keimling, 🌿 Setzling, 🌳 Jungbaum, 🏰 Erfahren, 🏆 Meister) and integrate these new definitions into the dashboard and word detail views.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS, Framer Motion, Lucide React  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library  
**Target Platform**: Web (Responsive)  
**Project Type**: Single web application  
**Performance Goals**: Instant layout transitions, responsive scaling  
**Constraints**: Tailwind responsive breakpoints (sm: 640px)  
**Scale/Scope**: UI/UX refinement across three main views (Tags, Dashboard, Word Detail)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: [PASSED] Centralizing the box definitions in a mapping ensures consistency and ease of future updates.
- **II. Maintainability and Extensibility**: [PASSED] Single-column layout for tag management improves reliability across various device sizes.
- **III. User-Centric Design**: [PASSED] Descriptive names and icons make the progress visualization more intuitive and engaging.
- **IV. Performance and Scalability**: [PASSED] CSS-based grid changes and simple mapping lookups have zero performance impact.

## Project Structure

### Documentation (this feature)

```text
specs/012-ui-tag-box-refinement/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── constants/
│   └── box-definitions.ts
├── components/
│   ├── tags/
│   │   └── TagList.tsx
│   ├── dashboard/
│   │   └── ProgressDistribution.tsx
│   └── vocabulary/
│       └── WordDetail.tsx
└── models/
    └── types.ts
```

**Structure Decision**: Maintenance of existing Next.js App Router structure with a new constants directory for shared definitions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
