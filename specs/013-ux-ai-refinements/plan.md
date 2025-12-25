# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This plan addresses a series of high-impact UX and AI refinements. We will empower learners by allowing them to choose their practice session length, significantly increasing flexibility. Keyboard accessibility will be boosted with "Enter" key navigation for single-action screens. On the intelligence side, we will upgrade the AI engine to "gpt-5.2" for superior translation quality. Finally, we will fix a critical UI state bug in the generator that was leading to empty screens after core operations.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, OpenAI SDK (v6+), Tailwind CSS, Framer Motion  
**Storage**: LocalStorage (via `LocalStorageRepository`)  
**Testing**: Vitest, React Testing Library  
**Target Platform**: Web  
**Project Type**: Single web application  
**Performance Goals**: Instant page transitions, AI response optimization  
**Constraints**: 0 runtime errors, 100% functional navigation paths  
**Scale/Scope**: Focused refinement of existing interaction flows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: [PASSED] Fixing state management bugs and improving model versions supports excellence.
- **II. Maintainability and Extensibility**: [PASSED] Improving keyboard navigation through global listeners is an extensible pattern.
- **III. User-Centric Design**: [PASSED] Flexible session lengths and keyboard shortcuts directly address user friction.
- **IV. Performance and Scalability**: [PASSED] Upgrading to gpt-5.2 ensures the app scales with the latest AI capabilities.

## Project Structure

### Documentation (this feature)

```text
specs/013-ux-ai-refinements/
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
│   ├── generate/        # Fix blank screen state
│   └── practice/        # Add session length selection
├── components/
│   ├── practice/
│   │   └── TagSelector.tsx # Add length options UI
│   └── hooks/           # Possible new global key listener
└── services/
    └── ai/
        └── OpenAIService.ts # Update model to gpt-5.2
```

**Structure Decision**: Standard Next.js feature-based structure with a focus on hooks for keyboard listeners.


## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
