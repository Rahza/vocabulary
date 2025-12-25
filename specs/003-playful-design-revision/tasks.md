# Tasks: Playful Design Revision

**Input**: Design documents from `/specs/003-playful-design-revision/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, quickstart.md

**Organization**: Tasks are grouped by design system setup and user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Design Tokens & Setup

**Purpose**: Establish the core design system foundation

- [x] T001 Configure custom Tailwind colors (`playful-indigo`, `playful-yellow`, etc.) and radius tokens in `tailwind.config.ts`
- [x] T002 Import `Quicksand` (or rounded alternative) font and apply globally in `src/app/layout.tsx`
- [x] T003 [P] Define CSS variables for the playful theme and custom `shadow-playful` utilities in `src/app/globals.css`
- [x] T004 Create reusable Framer Motion animation variants in `src/lib/animations.ts`

---

## Phase 2: UI Library Refinement (Foundational)

**Purpose**: Update base components to adhere to the new playful aesthetic

- [x] T005 [P] Update `src/components/ui/Button.tsx` with bouncy Framer Motion effects and "depth" shadows
- [x] T006 [P] Refactor `src/components/ui/Input.tsx` with `rounded-playful` corners and vibrant focus states
- [x] T007 Create a playful `ProgressBar` component with smooth transition logic in `src/components/ui/ProgressBar.tsx`

**Checkpoint**: Design tokens and base components ready

---

## Phase 3: User Story 1 - Vibrant Visual Identity (Priority: P1)

**Goal**: Apply colorful cards and illustrative icons across the app

- [x] T008 [P] [US1] Redesign Dashboard cards in `src/components/dashboard/StatsOverview.tsx` using vibrant backgrounds and 20px radius
- [x] T009 [P] [US1] Update `src/app/page.tsx` with illustrative Lucide icons for main actions (Generate, Train, Practice)
- [x] T010 [US1] Refactor `src/components/generator/GeneratorForm.tsx` to use the refined playful UI library and colorful grouping

**Checkpoint**: Dashboard and Generator now feature the vibrant identity

---

## Phase 4: User Story 2 - Satisfying Feedback & Animations (Priority: P1)

**Goal**: Implement "juicy" feedback for learning interactions

- [x] T011 [US2] Implement slide-in/slide-out transitions for cards in `src/components/trainer/Flashcard.tsx`
- [x] T012 [US2] Add "Juicy" success/failure feedback (pulses, color glows) in `src/components/trainer/Flashcard.tsx`
- [x] T013 [P] [US2] Add celebratory bouncy animations to `src/components/practice/SessionSummary.tsx` for completion

**Checkpoint**: Learning sessions feel "juicy" and interactive

---

## Phase 5: User Story 3 - Detailed Component Refinement (Priority: P2)

**Goal**: Redesign the virtual keyboard for a tactile feel

- [x] T014 [US3] Redesign `src/components/keyboard/VirtualKeyboard.tsx` buttons as "Keycaps" with physical depression effects
- [x] T015 [P] [US3] Integrate the smooth `ProgressBar` into the training flow in `src/app/trainer/page.tsx`

**Checkpoint**: Tactical and detailed refinement complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality audit

- [x] T016 [P] Run accessibility audit for color contrast on vibrant palettes; adjust `playful-yellow` text colors as needed
- [x] T017 [P] Performance check: Ensure all Framer Motion animations maintain 60fps on mobile simulation
- [x] T018 Final responsiveness check for all new design elements across mobile and desktop

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: BLOCKS all other phases.
- **UI Library (Phase 2)**: Depends on Phase 1; BLOCKS feature implementation.
- **User Stories (Phase 3-5)**: All depend on Phase 2; can proceed in parallel.
- **Polish (Phase 6)**: Depends on all User Stories being complete.

### Parallel Opportunities

- T003 can run with T001/T002.
- All tasks in Phase 2 are parallelizable.
- US1, US2, and US3 tasks can run in parallel by different "developers" if tokens are established.

---

## Implementation Strategy

### MVP First (UI Tokens & Trainer)

1. Complete Phase 1 & 2.
2. Complete US2 (Juicy Feedback) in Trainer.
3. **VALIDATE**: Ensure the core "learning" loop feels playful.

### Full Rollout

1. Apply US1 to Dashboard.
2. Apply US3 to Keyboard.
3. Final Polish.