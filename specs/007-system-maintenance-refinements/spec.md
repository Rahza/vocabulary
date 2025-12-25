# Feature Specification: System Maintenance & Refinements

**Feature Branch**: `007-system-maintenance-refinements`  
**Created**: 2025-12-25  
**Status**: Draft  
**Input**: User description: "Allow editing tags themselves (delete/rename). In the word detail view, allow recreating the mnemonic for that single word. When selecting multiple words and performing a bulk action, don't deselect them after performing the action. Perform a code audit, fix all eslint errors. Make sure tests don't run in interactive mode per default. Audit, add and run tests. The Skip button in the trainer doesn't work. Don't allow tips/mnemonic in the trainer, only in practice mode."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Global Tag Management (Priority: P1)

As a user, I want to rename or delete tags globally so that I can organize my vocabulary efficiently without editing every word individually.

**Why this priority**: Tag management was previously limited. Rename and delete are core operations for maintaining a clean categorization system.

**Independent Test**: Can be tested by renaming a tag in the Tag Manager and verifying that all words associated with that tag now show the new name.

**Acceptance Scenarios**:

1. **Given** several words with tag "Travel", **When** I rename "Travel" to "Holiday" in the Tag Manager, **Then** all those words are updated to "Holiday".
2. **Given** a tag "Old", **When** I delete "Old" in the Tag Manager, **Then** the tag is removed from all associated words.

---

### User Story 2 - Mnemonic Refresh (Priority: P2)

As a learner, if I find a mnemonic unhelpful, I want to request a new one for that specific word from the detail view.

**Why this priority**: AI-generated mnemonics might not always be perfect. Allowing a "refresh" improves the educational value of the cards.

**Independent Test**: Open a word's detail view, click "Regenerate Mnemonic", and verify the text changes to a new AI-generated suggestion.

**Acceptance Scenarios**:

1. **Given** a word with an existing mnemonic, **When** I trigger "Regenerate Mnemonic", **Then** the system fetches and saves a new mnemonic for that word.

---

### User Story 3 - Bulk Action Efficiency (Priority: P2)

As a power user, when I perform a bulk action (like adding a tag to 10 words), I want the selection to remain active so that I can perform another action (like moving them to a different box) without re-selecting.

**Why this priority**: Improves workflow efficiency by reducing repetitive selection steps.

**Independent Test**: Select 3 words, apply a tag via bulk action, and verify the 3 words are still checked after the toast message appears.

**Acceptance Scenarios**:

1. **Given** multiple words are selected, **When** a bulk action is completed, **Then** the checkboxes remain checked.

---

### User Story 4 - Consistent Training Experience (Priority: P1)

As a learner, I expect the "Skip" button to work in the trainer and for the trainer to be more challenging than practice mode by not providing hints.

**Why this priority**: Fixed core bugs in the trainer mode and enforces the distinction between "Learning/Practice" (with aids) and "Testing/Training" (without aids).

**Independent Test**: Start a Trainer session, verify the "Tip" and "Mnemonic" aids are missing, and verify the "Skip" button correctly reveals the answer and moves to the next card.

**Acceptance Scenarios**:

1. **Given** I am in Trainer mode, **When** I look for the "Tip" or "Show Mnemonic" buttons, **Then** they are not visible.
2. **Given** I am stuck in Trainer mode, **When** I click "Skip", **Then** the answer is revealed and the session progresses.

---

### Edge Cases

- **Renaming to existing tag**: If a user renames "A" to "B", and "B" already exists, the words from "A" should be merged into "B" (duplicates removed).
- **Network failure during mnemonic regen**: Should show an error toast and keep the old mnemonic.
- **Bulk action failure**: If a bulk action fails for some reason, the selection should still persist to allow retry.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a global "Rename Tag" action that propagates changes to all associated `VocabularyItem` entries.
- **FR-002**: System MUST provide a global "Delete Tag" action that removes the tag from all associated `VocabularyItem` entries.
- **FR-003**: System MUST provide a "Regenerate Mnemonic" button in the word detail view.
- **FR-004**: System MUST NOT clear the selection state after a bulk action is performed.
- **FR-005**: Trainer mode MUST NOT display or allow access to "Tip" (letter reveal) or "Mnemonic" buttons.
- **FR-006**: Fix the "Skip" button in the Trainer to correctly reveal the answer and mark the item as skipped/incorrect.
- **FR-007**: Codebase MUST have 0 ESLint errors.
- **FR-008**: Test suite MUST run in non-interactive (CI-friendly) mode by default.

### Key Entities

- **VocabularyItem**: Updated via global tag changes and mnemonic regeneration.
- **Tag**: Entity managed via rename/delete.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run lint` returns exit code 0.
- **SC-002**: `npm test` runs all tests once and exits (non-interactive).
- **SC-003**: Tag renaming completes in < 1s for a collection of 500 words.
- **SC-004**: Selection state persistence verified across all bulk operations.