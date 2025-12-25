# Tasks: UX & AI Refinements

**Spec**: [specs/013-ux-ai-refinements/spec.md](specs/013-ux-ai-refinements/spec.md)

## Dependencies

- **Phase 1: Setup**: Foundational hook and configuration updates.
- **Phase 2: Generator Workflow**: High priority functional fix.
- **Phase 3: Practice Length**: High priority feature.
- **Phase 4: Keyboard Navigation**: Enhancement dependent on the setup hook.

## Implementation Strategy

We will prioritize the critical bug fix in the Generator (US4) and the AI model update. Then, we will build the session length selection (US1). Finally, we'll roll out the keyboard accessibility improvements using a standardized custom hook.

---

## Phase 1: Setup & Foundational Extensions

**Goal**: Update configuration and establish reusable hooks.

- [x] T001 Update AI model identifier to `gpt-5.2` in `src/services/ai/OpenAIService.ts`
- [x] T002 Create `useEnterKey` custom hook in `src/hooks/use-enter-key.ts`

## Phase 2: User Story 4 - Reliable Generator Workflow (Priority: P1)

**Goal**: Fix the state management bug leading to blank screens.
**Independent Test**: Generate words, click discard, and verify the generator form reappears.

- [x] T003 [US4] Refactor state management in `src/app/generate/page.tsx` to explicitly handle transitions back to the 'form' state
- [x] T004 [US4] Ensure `AnimatePresence` correctly unmounts results and remounts the form in `src/app/generate/page.tsx`

## Phase 3: User Story 1 - Flexible Practice Length (Priority: P1)

**Goal**: Allow users to select session length.
**Independent Test**: Select "5 words" and verify only 5 cards are shown.

- [x] T005 [P] [US1] Create session length selection UI (Options: 5, 10, 20, All) in `src/components/practice/TagSelector.tsx`
- [x] T006 [US1] Update `handleTagSelect` in `src/app/practice/page.tsx` to accept and apply the `sessionLength` parameter
- [x] T007 [US1] Ensure the "All" option correctly uses the full pool length in `src/app/practice/page.tsx`

## Phase 4: User Story 2 - Keyboard Accessibility (Priority: P2)

**Goal**: Enable "Enter" key navigation.
**Independent Test**: Navigate to Summary or Dashboard and press Enter to trigger the main action.

- [x] T008 [US2] Integrate `useEnterKey` in `src/app/page.tsx` (Dashboard) to trigger "Daily Training"
- [x] T009 [US2] Integrate `useEnterKey` in `src/components/practice/SessionSummary.tsx` to trigger "Go Again" or "Finish"
- [x] T010 [US2] Integrate `useEnterKey` in `src/components/trainer/Flashcard.tsx` to trigger the "Next" button when result is not null

## Phase 5: Polish & Quality Audit

**Goal**: Final verification and code quality.

- [x] T011 [P] Run `npm run lint` and fix any issues
- [x] T012 [P] Verify that "Enter" key doesn't trigger unexpectedly in text inputs
- [x] T013 Verify German localization for the new session length picker
