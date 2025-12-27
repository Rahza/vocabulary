# Tasks: Application i18n Implementation

**Input**: Design documents from `specs/022-app-i18n-implementation/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Project initialization and dependency management

- [x] T001 Install `next-intl` dependency using `npm install next-intl`
- [x] T002 Create initial translation files `messages/en.json`, `messages/de.json`, and `messages/cs.json`
- [x] T003 [P] Update `src/models/types.ts` to include `language` in `UserSettings` interface

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for locale-based routing and detection

**⚠️ CRITICAL**: No user story work can begin until this infrastructure is ready

- [x] T004 Create `src/i18n/routing.ts` to define supported locales and routing configuration
- [x] T005 Create `src/i18n/request.ts` to configure `next-intl` for the App Router
- [x] T006 Implement locale middleware in `src/middleware.ts` for detection and redirection
- [x] T007 [P] Refactor project structure by moving `src/app/*` into `src/app/[locale]/`, explicitly excluding `src/app/api`, `src/app/favicon.ico`, and `src/app/globals.css`
- [x] T008 Update `src/app/[locale]/layout.tsx` to accept `locale` param and wrap children with `NextIntlClientProvider` (if needed for client components)

---

## Phase 3: User Story 1 - Automatic Language Detection (Priority: P1) 🎯 MVP

**Goal**: App starts in browser language or falls back to English.

**Independent Test**: Set browser language to "Deutsch" and verify UI loads in German on first visit.

### Implementation for User Story 1

- [x] T009 [US1] Externalize strings for Dashboard in `messages/*.json` and use `useTranslations` in `src/app/[locale]/page.tsx`
- [x] T010 [US1] Externalize common strings (Buttons, Navigation) in `messages/*.json` and update `src/components/layout/Navigation.tsx`
- [x] T011 [US1] Update `src/contexts/SettingsContext.tsx` to initialize language from browser/middleware detection if no saved preference exists

**Checkpoint**: User Story 1 complete - App detects and applies supported system languages.

---

## Phase 4: User Story 2 & 3 - Manual Selection & Persistence (Priority: P1)

**Goal**: Allow users to change and save their language preference.

**Independent Test**: Change language in Settings, refresh page, and verify the choice persists.

### Implementation for User Story 2 & 3

- [x] T012 [US2] Update `src/contexts/SettingsContext.tsx` to handle language updates and sync with a `NEXT_LOCALE` cookie for the middleware
- [x] T013 [US2] Create `LanguageSelector` component in `src/components/settings/LanguageSelector.tsx`
- [x] T014 [US2] Integrate `LanguageSelector` into `src/app/[locale]/settings/page.tsx`
- [x] T015 [US3] Ensure `SettingsContext` persistence logic in `LocalStorage` correctly stores and restores the `language` field

**Checkpoint**: User Stories 2 & 3 complete - Users can manually switch languages and settings are saved.

---

## Phase 5: Complete App Translation

**Purpose**: Externalize remaining strings and localize formats

- [x] T016 [P] Externalize strings for Vocabulary module in `messages/*.json` and update `src/app/[locale]/vocabulary/page.tsx` and related components
- [x] T017 [P] Externalize strings for Trainer/Practice module in `messages/*.json` and update `src/app/[locale]/trainer/page.tsx`, `src/app/[locale]/practice/page.tsx`
- [x] T018 [P] Externalize strings for Generator module in `messages/*.json` and update `src/app/[locale]/generate/page.tsx`
- [x] T019 [P] Update `src/components/ui/Heading.tsx` and other UI components to use translated labels where applicable
- [x] T020 Implement localized date and number formatting (separators) using `Intl` or `useFormatter` from `next-intl`
- [x] T021 [US1] Ensure practice session state is preserved when switching locales by using client-side navigation or state sync

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final quality assurance and cleanup

- [x] T022 [P] Verify that all hardcoded German strings are removed using a global search
- [x] T023 [P] Verify contrast standards for all translated text in Light and Dark mode
- [x] T024 Run final visual audit using `specs/022-app-i18n-implementation/quickstart.md` scenarios
- [x] T025 Run production build verification with `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must complete first.
- **Foundational (Phase 2)**: Depends on Setup. BLOCKS all page-level changes.
- **User Stories (Phase 3-4)**: Depend on Foundational.
- **Translation (Phase 5)**: Depends on User Story structure being ready.
- **Polish (Final Phase)**: Runs after all translations are complete.

### Parallel Opportunities

- T002 and T003 can run in parallel.
- Moving files (T007) can happen alongside middleware setup (T006).
- Translation of different modules (T016-T018) can happen in parallel.

---

## Implementation Strategy

### MVP First (Core Infrastructure)

1. Install and configure `next-intl`.
2. Move pages to `[locale]` folder.
3. Translate Dashboard and Navigation (MVP visual proof).

### Screen-by-Screen Rollout

1. Translate Settings and implement Language Selector.
2. Systematically translate Vocabulary, Trainer, and Practice modules.
3. Apply localized formatting.
