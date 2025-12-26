# Implementation Plan: Vocabulary Management

**Branch**: `005-vocabulary-management` | **Date**: 2025-12-25 | **Spec**: [specs/005-vocabulary-management/spec.md](spec.md)
**Input**: Feature specification from `/specs/005-vocabulary-management/spec.md`

## Summary

This feature implements a comprehensive vocabulary management system, allowing users to browse, search, and filter their collection. It includes tools for individual word maintenance (resetting progress, deletion, tagging) and global tag management, including bulk actions. The implementation will leverage the existing `LocalStorageRepository` and React state for efficient filtering.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS, Framer Motion, Lucide React, Sonner  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library (`npm test`)  
**Target Platform**: Web (Next.js)  
**Project Type**: Single web application  
**Performance Goals**: Search/Filter response < 100ms for 500+ items  
**Constraints**: Client-side storage only (LocalStorage)  
**Scale/Scope**: Manage collection of hundreds to thousands of vocabulary items

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: [PASSED] The modular repository pattern and React state management follow best practices.
- **II. Maintainability and Extensibility**: [PASSED] Separating tag management and bulk actions ensures a modular UI.
- **III. User-Centric Design**: [PASSED] Search, filters, and bulk actions directly address user efficiency.
- **IV. Performance and Scalability**: [PASSED] Client-side filtering is performant for the target scale.

## Project Structure

### Documentation (this feature)

```text
specs/005-vocabulary-management/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── vocabulary/      # New vocabulary management page
│   │   └── page.tsx
│   └── tags/            # New tag management page
│       └── page.tsx
├── components/
│   ├── vocabulary/      # Vocabulary specific components
│   │   ├── VocabularyList.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── WordActions.tsx
│   │   └── BulkActions.tsx
│   └── tags/            # Tag management components
│       ├── TagList.tsx
│       └── TagEditor.tsx
├── services/
│   └── storage/
│       └── LocalStorageRepository.ts # Will need updates for tag management and bulk actions
└── models/
    └── types.ts         # Verify/Update types
```

**Structure Decision**: Standard Next.js App Router structure with feature-based component organization.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| N/A       |            |                                      |
