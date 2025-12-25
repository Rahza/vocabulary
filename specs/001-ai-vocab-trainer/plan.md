# Implementation Plan: AI Vocabulary Trainer

**Branch**: `001-ai-vocab-trainer` | **Date**: 2025-12-25 | **Spec**: [Link](spec.md)
**Input**: Feature specification from `/specs/001-ai-vocab-trainer/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

A mobile-first web application for learning German-Czech vocabulary using AI generation and the Leitner spaced repetition system. Built with Next.js and React, it currently operates without a backend, storing data in LocalStorage, but uses a Repository pattern to facilitate future migration to a hosted database. It features a playful, modern design with animations.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.x, Node.js 18+  
**Primary Dependencies**: Next.js 14+ (App Router), React 18, OpenAI SDK, Framer Motion, Lucide React, Tailwind CSS, shadcn/ui (optional components)  
**Storage**: Browser LocalStorage (abstracted via Repository pattern)  
**Testing**: Jest, React Testing Library  
**Target Platform**: Mobile Web (Responsive)  
**Project Type**: Single Page Application (Next.js SSG/CSR)  
**Performance Goals**: <100ms UI interaction latency, Smooth 60fps animations  
**Constraints**: No backend server (initially), Client-side API keys, Offline capability for practice  
**Scale/Scope**: ~1000s of words, Single user per device

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Engineering Excellence**: ✅ Repository pattern implemented for data layer to decouple UI from LocalStorage. Strict TypeScript usage.
- **II. Maintainability and Extensibility**: ✅ Service-based architecture allows swapping `LocalStorageRepository` for `SupabaseRepository` later without code changes in components.
- **III. User-Centric Design**: ✅ Mobile-first approach, custom diacritics keyboard for usability, playful animations (Framer Motion) for engagement.
- **IV. Performance and Scalability**: ✅ Client-side storage ensures instant load times. Structure supports scaling to backend.

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-vocab-trainer/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx         # Dashboard
│   ├── generate/        # Generator Page
│   ├── trainer/         # Leitner Trainer Page
│   ├── practice/        # Practice Mode Page
│   └── settings/        # Settings (API Key)
├── components/
│   ├── ui/              # Generic UI components (buttons, inputs)
│   ├── keyboard/        # Diacritics keyboard
│   └── flashcards/      # Flashcard components
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── models/              # TypeScript Interfaces (VocabularyPair, etc.)
├── services/
│   ├── storage/         # LocalStorage Repository
│   ├── ai/              # OpenAI Service
│   └── leitner/         # Spaced Repetition Logic
└── hooks/               # React hooks for data access
```

**Structure Decision**: Next.js App Router standard structure with distinct layers for Services (Data/AI) and UI Components.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Repository Pattern | Future migration to Backend | Direct LocalStorage calls in components would make migration strictly harder (refactoring hell). |
| Client-side API Key | User Requirement | Backend proxy is safer but violates "no hosted backend" constraint. |
