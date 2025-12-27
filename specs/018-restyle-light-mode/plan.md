# Implementation Plan: Restyle Light Mode

**Branch**: `018-restyle-light-mode` | **Date**: 2025-12-25 | **Spec**: `specs/018-restyle-light-mode/spec.md`
**Input**: Feature specification from `/specs/018-restyle-light-mode/spec.md`

## Summary

This feature focuses on a complete visual overhaul of the Light Mode. The current design is a simple inversion of Dark Mode, leading to a flat and unpolished appearance. The new design will utilize soft shadows, layered backgrounds, and a clean typography palette to create a "first-class" light mode experience. Crucially, this will be implemented using scoped Tailwind classes and CSS variables to ensure zero regressions in Dark Mode.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, Tailwind CSS v4, `next-themes`, Framer Motion, Lucide React  
**Storage**: N/A (Visual Refactor)  
**Testing**: Manual Visual Audit, WCAG Contrast Check  
**Target Platform**: Web
**Project Type**: Single project
**Performance Goals**: Zero impact on bundle size or runtime performance.  
**Constraints**:

- No hardcoded hex codes in component files.
- Absolute isolation of light mode changes.
- Must pass WCAG AA contrast standards.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- **I. Engineering Excellence**: Pass. Utilizing CSS variables and scoped classes is best practice for theme management.
- **II. Maintainability and Extensibility**: Pass. Centralizing theme definitions in `globals.css` simplifies future tweaks.
- **III. User-Centric Design**: Pass. Prioritizes visual quality and accessibility.
- **IV. Performance and Scalability**: Pass. Lightweight CSS changes only.
- **V. Version Control Discipline**: Pass. Incremental changes to `globals.css` and then UI components.
- **VI. Pragmatic Testing**: Pass. Focuses on visual regression and contrast.
- **VII. Strict Linting & Formatting**: Pass. Following project standards.
- **VIII. Strong Typing Discipline**: Pass. Prop interfaces for themed components are well-defined.
- **IX. Modern Coding Style**: Pass. Using arrow functions and functional patterns.

## Project Structure

### Documentation (this feature)

```text
specs/018-restyle-light-mode/
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
│   └── globals.css      # Core theme variable updates
├── components/
│   └── ui/              # Component-specific light mode overrides
│       ├── Card.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       └── ...
```

**Structure Decision**: We will stick to the single project structure. The primary logic will reside in `globals.css` via custom variables and utility classes, with targeted adjustments in `src/components/ui/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
