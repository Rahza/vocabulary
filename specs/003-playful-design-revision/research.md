# Research & Technical Decisions: Playful Design Revision

## Design System & Tokens

- **Decision**: Define a custom Tailwind CSS configuration for the "Playful" theme.
- **Tokens**:
    - **Colors**:
        - `playful-indigo`: `#6366f1` (Vibrant Indigo)
        - `playful-yellow`: `#fbbf24` (Sunny Yellow)
        - `playful-green`: `#34d399` (Mint Green)
        - `playful-red`: `#f87171` (Coral Red)
    - **Radius**: `playful-radius: 20px`.
    - **Shadows**: Soft, multi-layered shadows for a "3D keycap" feel.
- **Rationale**: Centralizing these in Tailwind ensures consistency across all components (FR-001).

## Typography

- **Decision**: Use `Geist` (already in project) but with a focus on rounded font features if available, or import `Quicksand` via Google Fonts.
- **Rationale**: Rounded typography complements the playful aesthetic.

## Animation Patterns (Framer Motion)

- **Decision**: Standardize on three primary motion variants:
    1. **Bouncy Button**: `whileHover={{ scale: 1.05 }}` and `whileTap={{ scale: 0.95, y: 2 }}`.
    2. **Juicy Correct**: `animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}` + Green glow.
    3. **Slide Transition**: `initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}`.
- **Rationale**: Provides the "juicy" and "satisfying" feedback requested (FR-002, US-2).

## Component Architecture

- **Decision**: Enhance `src/components/ui/Button.tsx` and `src/components/ui/Input.tsx` to support the new tokens by default.
- **Keyboard**: Add a `Keycap` component to `src/components/keyboard/VirtualKeyboard.tsx` that uses specific border-bottom offsets to simulate physical depth.
- **Rationale**: Strong attention to detail (US-3).
