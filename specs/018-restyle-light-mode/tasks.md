# Tasks: Restyle Light Mode

**Input**: Design documents from `specs/018-restyle-light-mode/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Initial CSS infrastructure and variable definition

- [x] T001 Define light mode specific CSS variables (background, foreground, card-shadow) in `src/app/globals.css`
- [x] T002 Add `@utility shadow-soft` for light mode elevation in `src/app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI component updates to support the new light mode design language

**⚠️ CRITICAL**: No user story work can begin until base components support the new variables

- [x] T003 [P] Update `Card` component to use soft shadows and subtle borders in light mode in `src/components/ui/Card.tsx`
- [x] T004 [P] Refine `Button` variants (secondary, outline, ghost) for light mode in `src/components/ui/Button.tsx`
- [x] T005 [P] Update `Input` component with focus shadows and refined borders in `src/components/ui/Input.tsx`
- [x] T006 [P] Audit `Badge` and `Heading` components for light mode contrast in `src/components/ui/Badge.tsx` and `src/components/ui/Heading.tsx`

---

## Phase 3: User Story 1 - Polished Light Mode (Priority: P1) 🎯 MVP

**Goal**: Implement the unique, polished light mode design across the entire application.

**Independent Test**: Switch to light mode in settings and verify that all core pages (Dashboard, Vocabulary, Trainer) look modern and distinct from dark mode.

### Implementation for User Story 1

- [x] T007 [US1] Apply clean white/gray background and high-contrast text logic in `src/app/layout.tsx`
- [x] T008 [US1] Refine Dashboard visual hierarchy and layering in `src/app/page.tsx`
- [x] T009 [US1] Refine Vocabulary management page visual structure in `src/app/vocabulary/page.tsx`
- [x] T010 [US1] Audit and adjust layout components (Navigation, Drawer) for light mode in `src/components/layout/Navigation.tsx` and `src/components/ui/Drawer.tsx`
- [x] T011 [US1] Refine Flashcard and Trainer UI for the new light mode palette in `src/components/trainer/Flashcard.tsx`

**Checkpoint**: MVP Ready - Light mode is fully restyled and looks professional.

---

## Phase 4: User Story 2 - Theme Independence (Priority: P1)

**Goal**: Ensure that all light mode changes are perfectly isolated and do not affect dark mode.

**Independent Test**: Toggle between light and dark mode repeatedly; verify dark mode remains identical to its previous state.

### Implementation for User Story 2

- [x] T012 [US2] Verify that all new styles are scoped to `[data-theme='light']` or appropriate Tailwind light classes in `src/app/globals.css`
- [x] T013 [US2] Perform a full dark mode regression audit across all 5 core screens
- [x] T014 [US2] Verify WCAG AA contrast standards (4.5:1) for all text/background combinations in light mode

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final quality assurance and cleanup

- [x] T015 [P] Search for and remove any hardcoded hex colors introduced during restyling in `src/components/`
- [x] T016 [P] Verify transition animations between modes in `src/app/globals.css`
- [x] T017 Run final production build to ensure no hydration or styling issues with `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be completed first to establish the theme variables.
- **Foundational (Phase 2)**: Depends on Phase 1 variables.
- **User Story 1 (Phase 3)**: Depends on Foundational components.
- **User Story 2 (Phase 4)**: Runs concurrently with/after US1 to ensure isolation.
- **Polish (Final Phase)**: Runs after all UI changes are complete.

### Parallel Opportunities

- All component updates in Phase 2 (T003-T006) can run in parallel.
- Polish tasks (T015-T016) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Establish light mode palette in CSS variables.
2. Update `Card` and `Button` (the most visible components).
3. Apply to Dashboard and Vocabulary.
4. **STOP and VALIDATE**: Verify light mode looks significantly better.

### Incremental Delivery

1. Foundation (Variables + Components).
2. Screen-by-screen refinement (US1).
3. Continuous regression testing (US2).
4. Final cleanup.
