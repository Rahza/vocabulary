# Implementation Plan: Vocabulary UI/UX Refinements

**Branch**: `006-vocab-ui-refinements` | **Date**: 2025-12-25 | **Spec**: [specs/006-vocab-ui-refinements/spec.md](spec.md)
**Input**: Feature specification from `/specs/006-vocab-ui-refinements/spec.md`

## Summary

This feature focuses on optimizing the vocabulary collection interface for high information density and improved workflow. We will redesign the vocabulary cards to be more compact, move mnemonics to a new detail view (drawer/modal), integrate a "Generate" button directly into the management page, and polish the bulk selection checkboxes.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS, Framer Motion, Lucide React, Sonner  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library (`npm test`)  
**Target Platform**: Web (Next.js)  
**Project Type**: Single web application  
**Performance Goals**: Instant opening of detail view (<50ms), smooth list transitions  
**Constraints**: Mobile-first design (touch targets must remain viable while compact)  
**Scale/Scope**: Refine existing `/vocabulary` and `/generate` interactions

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: [PASSED] Following existing component patterns and design system.
- **II. Maintainability and Extensibility**: [PASSED] Detail view will be a modular component used across management features.
- **III. User-Centric Design**: [PASSED] Addressing specific user feedback on information density and workflow efficiency.
- **IV. Performance and Scalability**: [PASSED] Compact cards reduce layout shift and improve rendering speed for large lists.

## Project Structure

### Documentation (this feature)

```text
specs/006-vocab-ui-refinements/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (N/A)
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   └── vocabulary/      # Integration of Generate button
├── components/
│   ├── vocabulary/
│   │   ├── VocabularyList.tsx  # Redesign for density and detail view trigger
│   │   ├── WordDetail.tsx      # New detail drawer/modal component
│   │   └── SearchFilters.tsx   # Add Generate button
│   └── ui/
│       └── Checkbox.tsx        # Potential refinement or standardizing selection UI
```

**Structure Decision**: Standard Next.js feature-based component organization.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       |            |                                      |
