# Tasks: Theme Component Abstraction & Standardization

**Input**: Design documents from `specs/017-theme-component-abstraction/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Initial audit and project preparation

- [x] T001 Review `src/components/ui/` and identify existing components that need theme standardization

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for abstracted UI components

**⚠️ CRITICAL**: No user story work can begin until these base components are ready

- [x] T002 Create reusable `Badge` component in `src/components/ui/Badge.tsx`
- [x] T003 Create reusable `Card` component in `src/components/ui/Card.tsx`
- [x] T004 Create reusable `Heading` component in `src/components/ui/Heading.tsx`
- [x] T005 [P] Audit and update existing `src/components/ui/Button.tsx` for full theme consistency
- [x] T006 [P] Audit and update existing `src/components/ui/Input.tsx` for full theme consistency

**Checkpoint**: Foundation ready - basic UI components can now be used for refactoring

---

## Phase 3: User Story 1 - Theme Consistency (Priority: P1)

**Goal**: Ensure all application screens support both modes correctly using the new components.

**Independent Test**: Navigate through all pages and verify consistent appearance in light and dark mode.

### Implementation for User Story 1

- [x] T007 [US1] Refactor `src/app/page.tsx` (Dashboard) to use `Heading` and standardized spacing
- [x] T008 [US1] Refactor `src/components/vocabulary/VocabularyList.tsx` to use `Card` and `Badge` components
- [x] T009 [US1] Refactor `src/components/dashboard/StatsOverview.tsx` to use `Card` component for statistics
- [x] T010 [US1] Refactor `src/app/vocabulary/page.tsx` to use `Heading` and `Card` for search/filter layout
- [x] T011 [US1] Refactor `src/components/vocabulary/WordDetail.tsx` to use `Card` and standardized typography

**Checkpoint**: User Story 1 complete - Core pages are visually consistent and theme-aware.

---

## Phase 4: User Story 2 - Component Reusability (Priority: P2)

**Goal**: Extend component usage to improve maintainability and developer efficiency.

**Independent Test**: Verify that secondary features and settings also use the abstracted components.

### Implementation for User Story 2

- [x] T012 [P] [US2] Refactor `src/components/tags/TagList.tsx` to use the `Badge` component
- [x] T013 [P] [US2] Refactor `src/components/settings/ThemeSelector.tsx` to use standardized `Card` styling
- [x] T014 [US2] Refactor `src/components/trainer/Flashcard.tsx` to utilize `Card` component for the card UI
- [x] T015 [US2] Update `src/app/settings/page.tsx` to use the new `Heading` component for section titles
- [x] T016 [US2] Refactor `src/app/practice/page.tsx` to follow the standardized UI pattern

**Checkpoint**: User Story 2 complete - Application-wide consistency reached using abstracted components.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final audit and code cleanup

- [x] T017 [P] Perform global search for hardcoded hex colors and replace with Tailwind semantic classes or CSS variables
- [x] T018 Run visual regression check on all pages using `specs/017-theme-component-abstraction/quickstart.md` scenarios
- [x] T019 Final cleanup of unused styles or legacy component wrappers

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on T001
- **User Stories (Phase 3-4)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Opportunities

- All tasks marked [P] in Phase 2 can run together
- Once Phase 2 is done, US1 and US2 implementation tasks can technically start in parallel, though US1 has higher priority
- Polish tasks marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Implement US1 tasks to fix core pages (Dashboard, Vocabulary).
3. Validate light/dark mode consistency on these pages.

### Incremental Delivery

1. Foundation ready (Card, Badge, Heading).
2. Refactor core screens (MVP).
3. Refactor secondary screens (US2).
4. Final cleanup and polish.
