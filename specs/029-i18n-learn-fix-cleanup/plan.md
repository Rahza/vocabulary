# Implementation Plan: I18n Fixes, Learn Mode Fix & UI Cleanup

**Branch**: `029-i18n-learn-fix-cleanup` | **Date**: 2025-12-26 | **Spec**: [specs/029-i18n-learn-fix-cleanup/spec.md]

## Summary
Audit and complete localization for all 6 supported languages. Fix the broken "Learn" mode by addressing potential Firestore indexing issues and improving observability in the Trainer page. Relocate the "Sign Out" button to the Settings page for a cleaner navigation experience.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, Firestore, `next-intl`  
**Storage**: Cloud Firestore (Indexing required)  
**Testing**: Manual visual audit + Firestore query verification  
**Target Platform**: Web (Next.js App Router)
**Project Type**: Single project
**Performance Goals**: Instant localized UI switch; reliable due review retrieval.
**Constraints**: Zero English strings in German/Czech/Spanish/French/Italian modes.
**Scale/Scope**: Entire application localization; Trainer logic; Settings page.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: ✅ Improves error handling and data consistency.
- **II. Maintainability and Extensibility**: ✅ Centralizes account management.
- **III. User-Centric Design**: ✅ Fully localized experience for all users.
- **IV. Performance and Scalability**: ✅ Standardizes navigation and verifies database efficiency.
- **V. Version Control Discipline**: ✅ Commits will be split by concern (I18n, Bugfix, UI).
- **VI. Pragmatic Testing**: ✅ Manual verification of all 6 language modes.
- **VII. Strict Linting & Formatting**: ✅ Adheres to project standards.
- **VIII. Strong Typing Discipline**: ✅ Uses strict types for Firestore queries.
- **IX. Modern Coding Style**: ✅ Arrow functions used for all components.

## Project Structure

### Documentation (this feature)

```text
specs/029-i18n-learn-fix-cleanup/
├── plan.md              # This file
├── research.md          # Gaps identified and logic audit
├── data-model.md        # Firestore indexing documentation
├── quickstart.md        # Verification guide
└── tasks.md             # Execution steps
```

### Source Code (repository root)

```text
messages/
├── de.json              # Fixed translations
├── cs.json              # Fixed translations
├── es.json              # NEW
├── fr.json              # NEW
└── it.json              # NEW
src/
├── app/[locale]/
│   ├── trainer/
│   │   └── page.tsx     # Fix load logic
│   └── settings/
│       └── page.tsx     # New Sign Out location
├── components/
│   └── layout/
│       └── Navigation.tsx # Remove Sign Out
└── services/
    └── storage/
        └── FirebaseRepository.ts # Verify logic
```

**Structure Decision**: Standardized localization directory structure; component-based UI relocation.

## Complexity Tracking
