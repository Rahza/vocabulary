# Tasks: Vocabulary UI/UX Refinements

**Feature Branch**: `006-vocab-ui-refinements`
**Implementation Plan**: [specs/006-vocab-ui-refinements/plan.md](plan.md)

## Implementation Strategy

We will implement the UI refinements in phases, focusing first on the foundational UI components (Drawer and SelectionToggle), then redesigning the vocabulary card for better density, and finally integrating the new navigation and detail flows.

## Dependencies

- **Phase 1 (Setup)**: Foundational UI components (Drawer, SelectionToggle).
- **Phase 2 (US1, US3)**: Redesigning the list and card for density, moving mnemonics to the detail drawer.
- **Phase 3 (US2)**: Integrating the Generator entry point.
- **Phase 4 (US4)**: Polishing the selection UI with the new toggle component.

## Parallel Execution Examples

- **Phase 1 UI Components** can be developed in parallel (Drawer and SelectionToggle).
- **Detail Drawer content** and **Generator Button** can be developed in parallel once foundational components are ready.

---

## Phase 1: Setup & Foundational UI

**Goal**: Create the reusable UI components needed for the refinements.

- [x] T001 [P] Create `SelectionToggle` component in `src/components/ui/SelectionToggle.tsx`
- [x] T002 [P] Create `Drawer` component using `framer-motion` in `src/components/ui/Drawer.tsx`

## Phase 2: User Story 1 & 3 - Compact List & Detail View (Priority: P1/P2)

**Goal**: Increase information density and implement the word detail view.
**Independent Test**: Verify that mnemonics are hidden in the list and appear when clicking a card to open the drawer. Verify at least 40% more items are visible.

- [x] T003 [P] [US3] Create `WordDetail` content component in `src/components/vocabulary/WordDetail.tsx`
- [x] T004 [US1, US3] Redesign vocabulary card in `src/components/vocabulary/VocabularyList.tsx` (reduce padding to `p-3`, hide mnemonic)
- [x] T005 [US3] Integrate `WordDetail` with `Drawer` in `src/app/vocabulary/page.tsx`
- [x] T006 [US3] Implement "Open Detail" trigger on card click in `src/components/vocabulary/VocabularyList.tsx`

## Phase 3: User Story 2 - Generator Integration (Priority: P1)

**Goal**: Add a quick access button to the generator.
**Independent Test**: Click the "Neu generieren" button and confirm it navigates to the generation page.

- [x] T007 [P] [US2] Add "Neu generieren" button to `SearchFilters` header in `src/components/vocabulary/SearchFilters.tsx`
- [x] T008 [US2] Implement navigation logic for the "Neu generieren" button in `src/components/vocabulary/SearchFilters.tsx`

## Phase 4: User Story 4 - Polished Selection UI (Priority: P2)

**Goal**: Align and polish the selection experience.
**Independent Test**: Verify that checkboxes are perfectly centered with word text and have smooth interactions.

- [x] T009 [US4] Replace custom button with `SelectionToggle` in `src/components/vocabulary/VocabularyList.tsx`
- [x] T010 [US4] Ensure pixel-perfect vertical alignment of `SelectionToggle` with term text in `src/components/vocabulary/VocabularyList.tsx`

## Phase 5: Polish & Cross-Cutting

**Goal**: Final visual and functional cleanup.

- [x] T011 [P] Verify mobile touch targets for compact cards and selection toggles
- [x] T012 [P] Verify German localization for all new UI labels (e.g., "Detail-Ansicht", "Neu generieren")
- [x] T013 Ensure smooth layout transitions when filtering with compact cards
