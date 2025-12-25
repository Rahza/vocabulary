# Research: UX & AI Refinements

## 1. Practice Session Parameterization
**Status**: Resolved
**Decision**: Add a `sessionLength` state to `PracticePage` and update `TagSelector` to allow users to choose between 5, 10, 20, or "All" words.
**Rationale**: The current hardcoded value of 20 is too rigid. Providing standard options (5, 10, 20) covers most use cases, while "All" allows for exhaustive sessions.

## 2. Global Keyboard Navigation
**Status**: Resolved
**Decision**: Implement a custom hook `useEnterKey(callback)` in a new `src/hooks/use-enter-key.ts` file.
**Rationale**: Many screens have a single primary action (e.g., "Start Training", "Finish", "Back to Dashboard"). A reusable hook simplifies adding this behavior to multiple pages without duplicating `useEffect` logic.

## 3. Generator State Fix
**Status**: Resolved
**Decision**: Ensure `src/app/generate/page.tsx` correctly handles the transition from `generated` state to the initial `form` state.
**Rationale**: The "blank screen" bug occurs because the component logic likely switches based on the *existence* of results but doesn't correctly re-mount or reset the form visibility after results are cleared (save/discard).

## 4. AI Model Upgrade
**Status**: Resolved
**Decision**: Update the model identifier in `src/services/ai/OpenAIService.ts`.
**Rationale**: Moving to `gpt-5.2` ensures the project uses the latest capabilities for translation and mnemonic generation.
