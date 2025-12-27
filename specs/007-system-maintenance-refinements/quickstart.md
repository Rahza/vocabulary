# Quickstart: System Refinements

## Verification Steps

### 1. Global Tag Rename

1. Go to the **Tags** page (`/tags`).
2. Click the "Edit" icon next to an existing tag.
3. Change the name and click "Save".
4. Go to the **Collection** page (`/vocabulary`) and verify that all words that had the old tag now have the new one.

### 2. Mnemonic Regeneration

1. Go to the **Collection** page (`/vocabulary`).
2. Click on a word card to open the **Detail View**.
3. Click the "Mnemonic neu generieren" button.
4. Verify the text is replaced with a new AI-generated mnemonic.

### 3. Bulk Action Persistence

1. Select multiple words in the collection.
2. Apply a tag using the bulk action bar.
3. Observe that the words remain selected after the operation.

### 4. Trainer Mode

1. Start a **Trainer** session (`/trainer`).
2. Verify that the "Tip" and "Mnemonic" buttons are hidden.
3. Click the "Skip" button and verify the card is correctly skipped.

### 5. Code Quality

```bash
# Verify no lint errors
npm run lint

# Verify tests run non-interactively
npm test
```
