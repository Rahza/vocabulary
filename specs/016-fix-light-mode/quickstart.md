# Quickstart & Test Scenarios: Light & Dark Mode

## Setup for Development

1. Install `next-themes`: `npm install next-themes`
2. Run development server: `npm run dev`
3. Navigate to `/settings`

## Manual Test Scenarios

### TS-001: Real-time Theme Switching
- **Action**: Go to Settings, click "Light" theme.
- **Expected**: Background becomes gray-50, text becomes zinc-900. Cards have white background.
- **Action**: Click "Dark" theme.
- **Expected**: Background becomes zinc-950, text becomes zinc-50. Cards have zinc-900 background.

### TS-002: System Synchronization
- **Action**: Set Settings to "System".
- **Action**: Change OS theme (e.g., macOS System Settings).
- **Expected**: App follows OS theme immediately.

### TS-003: Persistence
- **Action**: Set theme to "Dark".
- **Action**: Refresh the page.
- **Expected**: App remains in "Dark" mode with no white flash during reload.

### TS-004: FOUC Prevention
- **Action**: Clear LocalStorage, set theme to "Dark".
- **Action**: Hard reload (Cmd+Shift+R).
- **Expected**: Background is dark from the first pixel rendered.

## Automated Tests (Vitest)

- **Test**: `SettingsContext` should correctly call `next-themes` hook when `updateSettings` is called.
- **Test**: `ThemeSelector` should highlight the currently active theme correctly.
