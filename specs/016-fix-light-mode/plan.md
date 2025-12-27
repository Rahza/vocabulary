# Implementation Plan: Light & Dark Mode Implementation

**Branch**: `016-fix-light-mode` | **Date**: 2025-12-25 | **Spec**: `specs/016-fix-light-mode/spec.md`
**Input**: Feature specification from `/specs/016-fix-light-mode/spec.md`

## Summary

Implement a robust light and dark mode system for the vocabulary app using `next-themes`. This feature replaces the current unstable custom theme logic with a standard, performance-optimized solution that supports real-time switching, system theme synchronization, and prevents Flash of Unstyled Content (FOUC). All UI components will be audited and updated to ensure high contrast and playful aesthetics in both themes.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, `next-themes`, Framer Motion, Lucide React, Sonner  
**Storage**: LocalStorage (via `next-themes` and `SettingsContext`)  
**Testing**: Vitest  
**Target Platform**: Web (Next.js App Router)
**Project Type**: Web application  
**Performance Goals**: Theme switching < 100ms, persistence restore < 50ms (no FOUC)  
**Constraints**: Zero linting violations, no `any`/`unknown` types, arrow functions for components.  
**Scale/Scope**: Entire application (all pages and components).

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: Pass. Using `next-themes` follows industry best practices.
- **II. Maintainability and Extensibility**: Pass. Standard library usage simplifies future maintenance.
- **III. User-Centric Design**: Pass. Supports system sync and real-time feedback.
- **IV. Performance and Scalability**: Pass. FOUC prevention is a key performance/UX goal.
- **V. Version Control Discipline**: Pass. Plan includes atomic changes.
- **VI. Pragmatic Testing**: Pass. Focuses on critical theme state transitions.
- **VII. Strict Linting & Formatting**: Pass. Adhering to project rules.
- **VIII. Strong Typing Discipline**: Pass. Explicit types for theme modes.
- **IX. Modern Coding Style**: Pass. Using arrow functions.

## Project Structure

### Documentation (this feature)

```text
specs/016-fix-light-mode/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this feature)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx       # Add ThemeProvider
│   └── settings/        # Update settings page
├── components/
│   ├── layout/          # Update Navigation for themes
│   ├── settings/        # Update ThemeSelector
│   └── ui/              # Audit all UI components
├── contexts/
│   └── SettingsContext.tsx # Remove theme logic, sync with next-themes
└── lib/
    └── utils.ts         # cn utility
```

**Structure Decision**: Option 2: Web application (Next.js App Router). We will modify the root layout to include the theme provider and audit all existing components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
