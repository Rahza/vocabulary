# Quickstart: I18n & Logic Verification

## 1. I18n Audit
Switch the application language in **Settings -> Language** and verify that no English strings remain in the following screens for **DE, CS, ES, FR, IT**:
- [ ] Dashboard
- [ ] Collection
- [ ] Trainer
- [ ] Practice
- [ ] Settings

## 2. Learn Mode Verification
1. Add a new vocabulary pair using the **Generator** or manual add (if available).
2. Navigate immediately to the **Trainer**.
3. Verify that the new words appear in the queue.
4. If the queue is empty, check the browser console for Firestore Index errors.

## 3. UI Cleanup
1. Verify the bottom navigation bar contains only 5 icons (Dashboard, Collection, Trainer, Practice, Settings).
2. Navigate to **Settings**.
3. Verify that a **Sign Out** button is present at the bottom of the page and functions correctly.
