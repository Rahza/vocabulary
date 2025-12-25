# Tasks: Light & Dark Mode Implementation

**Input**: Design documents from `specs/016-fix-light-mode/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency management

- [x] T001 Install `next-themes` dependency using npm
- [x] T002 [P] Configure Tailwind CSS v4 to support class-based dark mode (if not already default) in `src/app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for theme management

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Implement `ThemeProvider` wrapper in `src/app/layout.tsx` using `next-themes`
- [x] T004 Remove legacy manual theme application logic from `src/contexts/SettingsContext.tsx`
- [x] T005 [P] Update `src/app/layout.tsx` to remove hardcoded `dark:` classes on body that might conflict with `next-themes`

**Checkpoint**: Foundation ready - theme management is now handled by `next-themes`.

---

## Phase 3: User Story 1 & 3 - Theme Selection & Persistence (Priority: P1) 🎯 MVP

**Goal**: Implement real-time theme switching and ensure it persists across sessions.

**Independent Test**: Change theme in Settings to "Light", refresh page, verify it remains "Light". Repeat for "Dark".

### Implementation for User Story 1 & 3

- [x] T006 [US1] Update `src/contexts/SettingsContext.tsx` to sync the `theme` field in `UserSettings` with `next-themes`' `setTheme`
- [x] T007 [US1] Update `src/components/settings/ThemeSelector.tsx` to use `useTheme` from `next-themes` for getting and setting the active theme
- [x] T008 [US1] Add hydration safety to `ThemeSelector.tsx` to prevent mismatch between server and client rendered theme icons
- [x] T009 [US3] Verify that `next-themes` correctly persists the selection in LocalStorage (default behavior)

**Checkpoint**: User Story 1 and 3 are functional. Theme can be switched and persists.

---

## Phase 4: User Story 2 - System Theme Synchronization (Priority: P2)

**Goal**: Support "System" theme preference that follows the OS settings.

**Independent Test**: Select "System" in Settings, change OS theme to dark/light, verify app follows immediately.

### Implementation for User Story 2

- [x] T010 [US2] Ensure "System" option in `src/components/settings/ThemeSelector.tsx` correctly calls `setTheme('system')`
- [x] T011 [US2] Verify `ThemeProvider` in `src/app/layout.tsx` has `enableSystem={true}` and `defaultTheme="system"`

**Checkpoint**: User Story 2 is functional. App respects OS theme preferences.

---

## Phase 5: Polish & UI Audit

**Purpose**: Ensure all components look great in both light and dark modes.

- [x] T012 [P] Audit and fix contrast in `src/components/vocabulary/VocabularyList.tsx` and `src/components/vocabulary/SearchFilters.tsx`
- [x] T013 [P] Audit and fix contrast in `src/components/vocabulary/WordDetail.tsx` and `src/components/vocabulary/BulkActions.tsx`
- [x] T014 [P] Audit and fix contrast in `src/components/trainer/Flashcard.tsx`
- [x] T015 [P] Audit and fix contrast in `src/components/dashboard/StatsOverview.tsx` and `src/components/dashboard/ProgressDistribution.tsx`
- [x] T016 [P] Audit and fix contrast in `src/components/layout/Navigation.tsx`
- [x] T017 [P] Audit and fix contrast in `src/components/ui/` (Button.tsx, Input.tsx, Drawer.tsx, ConfirmDialog.tsx)
- [x] T018 [P] Audit and fix contrast in `src/app/page.tsx` (Dashboard) and `src/app/settings/page.tsx`
- [x] T019 Final validation using `specs/016-fix-light-mode/quickstart.md` scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on T001. Blocks all UI work.
- **User Stories (Phase 3-4)**: Depend on Phase 2.
- **Polish (Phase 5)**: Depends on User Stories being functional.

### Parallel Opportunities

- T002 can run in parallel with T001.
- T005 can run in parallel with T003/T004.
- T012 through T018 can all run in parallel once the theme switching is functional.

---

## Implementation Strategy

### MVP First (User Story 1 & 3)

1. Install `next-themes`.
2. Setup `ThemeProvider`.
3. Update `ThemeSelector` to use `next-themes`.
4. **VALIDATE**: Theme switching works and persists.

### Full Polish

1. Complete System Theme sync (US2).
2. Systematic audit of all components for light/dark contrast.
