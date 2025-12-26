# vocabulary Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-25

## Active Technologies
- TypeScript 5.x, Node.js 18+ + Firebase SDK (v10+), OpenAI SDK (v4+), Next.js 16+, firebase-admin (026-firebase-backend-auth)
- Cloud Firestore (026-firebase-backend-auth)

- TypeScript 5.x, Node.js 18+ + `sonner` (New), Next.js, React, Tailwind CSS (002-fix-vocab-bugs)
- LocalStorage (Unchanged) (002-fix-vocab-bugs)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, OpenAI SDK, Tailwind CSS, Framer Motion, Sonner (004-vocab-enhancements-de)
- LocalStorage (via `LocalStorageRepository`) (004-vocab-enhancements-de)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, Tailwind CSS, Framer Motion, Lucide React, Sonner (005-vocabulary-management)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, OpenAI SDK, Lucide React, Framer Motion, Vites (007-system-maintenance-refinements)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, OpenAI SDK, Framer Motion, Lucide React, Sonner (008-fix-system-refinements)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, OpenAI SDK (v6+), Tailwind CSS, Framer Motion (013-ux-ai-refinements)
- LocalStorage (via `LocalStorageRepository` and `next-themes` or custom Context) (015-settings-ui-management-refinement)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, Tailwind CSS v4, `next-themes`, Framer Motion, Lucide React, Sonner (016-fix-light-mode)
- LocalStorage (via `next-themes` and `SettingsContext`) (016-fix-light-mode)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, Tailwind CSS v4, Framer Motion, Lucide React, `next-themes` (017-theme-component-abstraction)
- N/A (UI refactor) (017-theme-component-abstraction)
- N/A (Visual Refactor) (018-restyle-light-mode)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, Tailwind CSS v4, Framer Motion, Lucide React, `sonner` (019-connect-pairs-practice)
- N/A (Pure Practice - no persistent state update) (019-connect-pairs-practice)
- LocalStorage (existing repo logic) (020-fix-matching-game-bugs)
- N/A (UI and logic refactor) (021-unify-practice-config)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, `next-intl`, Tailwind CSS v4, `next-themes` (022-app-i18n-implementation)
- LocalStorage (via `SettingsContext`) + Cookie (for middleware) (022-app-i18n-implementation)
- TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, Tailwind CSS v4, `next-intl`, `next-themes`, Framer Motion, Lucide React, `sonner` (024-lang-selector-refinement)
- LocalStorage (via `LocalStorageRepository`), Cookie (for middleware) (024-lang-selector-refinement)

- TypeScript 5.x, Node.js 18+ + Next.js 14+ (App Router), React 18, OpenAI SDK, Framer Motion, Lucide React, Tailwind CSS, shadcn/ui (optional components) (001-ai-vocab-trainer)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x, Node.js 18+: Follow standard conventions

## Constitution

- **V. Version Control Discipline**: Atomic, clear, and descriptive commits.
- **VI. Pragmatic Testing**: High-value tests covering core logic and edge cases only.
- **VII. Strict Linting & Formatting**: Strict ruleset, no comment suppression.
- **VIII. Strong Typing Discipline**: No `any` or `unknown`, no comment suppression.
- **IX. Modern Coding Style**: Mandatory arrow functions for components and logic.

## Recent Changes
- 026-firebase-backend-auth: Added TypeScript 5.x, Node.js 18+ + Firebase SDK (v10+), OpenAI SDK (v4+), Next.js 16+, firebase-admin

- 024-lang-selector-refinement: Added TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, Tailwind CSS v4, `next-intl`, `next-themes`, Framer Motion, Lucide React, `sonner`
- 023-dynamic-language-pairs: Added TypeScript 5.x, Node.js 18+ + Next.js 16+, React 19, OpenAI SDK, Framer Motion, Lucide Reac

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
