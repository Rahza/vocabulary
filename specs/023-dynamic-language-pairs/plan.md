# Implementation Plan: Dynamic Language Pair Selection

**Branch**: `023-dynamic-language-pairs` | **Date**: 2025-12-25 | **Spec**: `specs/023-dynamic-language-pairs/spec.md`
**Input**: Feature specification from `/specs/023-dynamic-language-pairs/spec.md`

## Summary

Implement a dynamic language pair selection system that allows users to choose their source and target languages on first launch. This selection will drive the AI generation prompts and the characters available on the virtual keyboard. The system will support English, German, Czech, French, Italian, and Spanish. Changes to the language pair will require a full app reset.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 16+, React 19, OpenAI SDK, Framer Motion, Lucide React  
**Storage**: LocalStorage (via `SettingsContext`)  
**Testing**: Manual Visual Audit, Prompt Verification  
**Target Platform**: Web (Mobile-first)
**Project Type**: Single project  
**Performance Goals**: <50ms keyboard update, zero delay in prompt injection.  
**Constraints**: Source != Target, reset required for change.  
**Scale/Scope**: Onboarding UI, `SettingsContext`, `OpenAIService`, `VirtualKeyboard`.

## Constitution Check

- **I. Engineering Excellence**: Pass. Standard onboarding pattern and modular keyboard logic.
- **II. Maintainability and Extensibility**: Pass. Language list and diacritics are stored in lookup tables.
- **III. User-Centric Design**: Pass. Personalized learning from the first start.
- **IV. Performance and Scalability**: Pass.
- **V. Version Control Discipline**: Pass. Atomic steps for onboarding, AI update, and keyboard update.
- **VI. Pragmatic Testing**: Pass. Manual verification of the core learning loop.
- **VII. Strict Linting & Formatting**: Pass.
- **VIII. Strong Typing Discipline**: Pass.
- **IX. Modern Coding Style**: Pass.

## Project Structure

### Documentation (this feature)

```text
specs/023-dynamic-language-pairs/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (to be generated)
```

### Source Code Changes

```text
src/
├── app/
│   └── [locale]/
│       └── layout.tsx   # Integrate Onboarding Overlay
├── components/
│   ├── onboarding/      # NEW: Language selection screen
│   ├── keyboard/
│   │   └── VirtualKeyboard.tsx # Make dynamic
│   └── settings/
│       └── SettingsPage.tsx # Leverage existing reset
├── contexts/
│   └── SettingsContext.tsx # Track language pair
└── services/
    └── ai/
        └── OpenAIService.ts # Dynamic prompts
```

**Structure Decision**: We will use a `LanguageOnboarding` component within the root layout that conditionally renders if no language pair is selected, blocking access to the rest of the app.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
