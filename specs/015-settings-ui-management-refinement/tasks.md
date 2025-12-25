# Tasks: Settings, Input & Management UI Refinements

**Spec**: [specs/015-settings-ui-management-refinement/spec.md](specs/015-settings-ui-management-refinement/spec.md)

## Dependencies

- **Phase 1: Setup**: Foundational UI and theme infrastructure.
- **Phase 2: Theme Management (US1)**: Global theme toggle logic.
- **Phase 3: Input & Empty States (US3, US4)**: Cross-cutting UI refinements.
- **Phase 4: Management Redesign (US2)**: Page-specific UI overhaul.

## Implementation Strategy

We will start by establishing the global theme management and input defaults to ensure a consistent foundation. Next, we will implement the `EmptyState` component which will be used in both the management and tag views. Finally, we will tackle the denser layout for the vocabulary collection page.

---

## Phase 1: Setup & Foundational UI

**Goal**: Prepare global settings and reusable components.

- [x] T001 Update `src/app/globals.css` to support class-based dark mode (replace `@media` with `.dark`)
- [x] T002 Implement `useTheme` logic in `src/contexts/SettingsContext.tsx` to toggle `.dark` class on root element
- [x] T003 Create reusable `EmptyState` component in `src/components/ui/EmptyState.tsx` using `framer-motion`
- [x] T004 [P] Set `autoComplete="off"` as default in `src/components/ui/Input.tsx` (Constitution VII)

## Phase 2: User Story 1 - Theme Customization (Priority: P1)

**Goal**: Implement theme selector in settings.
**Independent Test**: Switch theme in settings; verify UI updates immediately and persists on reload.

- [x] T005 [US1] Add `theme` field to `UserSettings` type in `src/models/types.ts`
- [x] T006 [US1] Create `ThemeSelector` component in `src/components/settings/ThemeSelector.tsx`
- [x] T007 [US1] Integrate `ThemeSelector` into `src/app/settings/page.tsx`

## Phase 3: User Story 3 & 4 - UX Refinements (Priority: P2/P3)

**Goal**: Improve empty states and input hygiene.
**Independent Test**: Delete all vocabulary; verify playful empty state appears. Verify no autocomplete on inputs.

- [x] T008 [US3] Integrate `EmptyState` into `src/components/vocabulary/VocabularyList.tsx` for 0-count results
- [x] T009 [US3] Integrate `EmptyState` into `src/components/tags/TagList.tsx` for 0-count categories
- [x] T010 [US3] Add empty state handling to Trainer completion view in `src/app/trainer/page.tsx`

## Phase 4: Management Redesign (US2)

**Goal**: Redesign vocabulary management header for density.
**Independent Test**: Verify more words are visible on mobile due to compact header.

- [x] T011 [US2] Refactor `src/app/vocabulary/page.tsx` header into a compact flex row
- [x] T012 [US2] Redesign `src/components/vocabulary/SearchFilters.tsx` to use a more horizontal, space-efficient layout
- [x] T013 [US2] Ensure all management actions (Bulk, Filter, Search) remain accessible in the new layout

## Phase 5: Polish & Quality Audit

**Goal**: Final consistency and compliance check.

- [x] T014 [P] Verify 100% arrow function usage across new files (Constitution IX)
- [x] T015 [P] Verify 100% type coverage without `any`/`unknown` (Constitution VIII)
- [x] T016 Run `npm run lint` and verify 0 errors (Constitution VII)
- [x] T017 Verify build success with `npm run build`
