# Tasks: System Maintenance & Refinements

**Spec**: [specs/007-system-maintenance-refinements/spec.md](specs/007-system-maintenance-refinements/spec.md)

## Dependencies

- **Phase 1: Setup**: Technical prerequisites (Scripts, Repository extensions)
- **Phase 2: Global Tag Management**: Depends on Phase 1 extensions
- **Phase 3: Training Experience**: Fixes core bugs in Trainer mode
- **Phase 4: Mnemonic Refresh**: Enhances detail view functionality
- **Phase 5: Bulk UX**: Improves selection workflow
- **Phase 6: Quality Audit**: Final verification and linting

## Implementation Strategy

We will start with the foundational setup by configuring the test runner and extending the storage repository. Then we will address the high-priority functional fixes (Tag Management and Trainer bugs). Following that, we'll implement the UX enhancements for bulk actions and mnemonics. The project concludes with a comprehensive code audit to eliminate all lint errors.

## Phase 1: Setup & Foundational Extensions

**Goal**: Prepare scripts and services for the refinements.

- [x] T001 Update `test` and `test:watch` scripts in `package.json` for non-interactive default
- [x] T002 Implement `renameTagGlobal` method in `src/services/storage/LocalStorageRepository.ts`
- [x] T003 [P] Add `generateSingleMnemonic` method to `src/services/ai/OpenAIService.ts`

## Phase 2: User Story 1 - Global Tag Management (P1)

**Goal**: Allow renaming and deleting tags across the entire collection.
**Independent Test**: Rename a tag in the Tag Manager and verify all associated words are updated.

- [x] T004 [US1] Add edit/rename mode to `TagList` component in `src/components/tags/TagList.tsx`
- [x] T005 [US1] Implement `handleRenameTag` in `src/app/tags/page.tsx` using repository method

## Phase 3: User Story 4 - Consistent Training Experience (P1)

**Goal**: Fix the Skip button and remove aids in Trainer mode.
**Independent Test**: Start Trainer, verify no Tips/Mnemonics are visible, and Skip correctly advances the queue.

- [x] T006 [US4] Add `hideAids` prop to `Flashcard` to toggle hint visibility in `src/components/trainer/Flashcard.tsx`
- [x] T007 [US4] Implement `onSkip` callback in `TrainerPage` to handle unanswered cards in `src/app/trainer/page.tsx`
- [x] T008 [US4] Integrate `hideAids` and `onSkip` props in `TrainerPage` call to `Flashcard` in `src/app/trainer/page.tsx`

## Phase 4: User Story 2 - Mnemonic Refresh (P2)

**Goal**: Allow regenerating mnemonics for individual words.
**Independent Test**: Click "Regenerate Mnemonic" in WordDetail and verify the text updates.

- [x] T009 [US2] Add "Regenerate Mnemonic" button UI to `WordDetail` in `src/components/vocabulary/WordDetail.tsx`
- [x] T010 [US2] Implement refresh logic calling `OpenAIService` in `src/components/vocabulary/WordDetail.tsx`

## Phase 5: User Story 3 - Bulk Action Efficiency (P2)

**Goal**: Keep selection active after bulk operations.
**Independent Test**: Perform a bulk tag action and verify words remain selected.

- [x] T011 [US3] Remove `setSelectedIds([])` calls in bulk handlers within `src/app/vocabulary/page.tsx`

## Phase 6: Quality Audit & Polish

**Goal**: Ensure code quality and test stability.

- [x] T012 Perform code audit and fix all ESLint errors reported by `npm run lint`
- [x] T013 Verify all tests pass in non-interactive mode via `npm test`
- [x] T014 [P] Add unit tests for `renameTagGlobal` in `src/services/storage/LocalStorageRepository.test.ts`
