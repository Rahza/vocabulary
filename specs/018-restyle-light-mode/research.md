# Research & Technical Decisions: Restyle Light Mode

## Light Mode Palette Design

- **Decision**: Shift from high-contrast borders to soft shadows and subtle layering.
- **Rationale**: The current light mode is just an inversion of dark mode, making it feel "flat" and "unpolished". Using shadows provides depth and a more modern feel.
- **Palette**:
    - **Background**: `white` or very light gray (`#fcfcfd`).
    - **Card Background**: `white`.
    - **Borders**: Extremely subtle (`zinc-100` or `zinc-200` at low opacity).
    - **Shadows**: Soft, layered shadows for elevation (e.g., `0 10px 40px -10px rgba(0,0,0,0.05)`).
    - **Accents**: Keep the "playful" colors (indigo, green, etc.) but ensure they have high enough contrast on white backgrounds.

## Component Specific Adjustments

### Card Component
- **Decision**: In light mode, use a very subtle border combined with a soft shadow. In dark mode, maintain the current high-contrast border.
- **Implementation**: Target `[data-theme='light']` or use Tailwind classes that behave differently in light mode (e.g., `shadow-sm dark:shadow-none`).

### Button Component
- **Decision**: Refine the `secondary`, `outline`, and `ghost` variants.
- **Rationale**: Currently, these feel a bit harsh in light mode. Softening the backgrounds and borders will improve the aesthetic.

### Input Component
- **Decision**: Use a cleaner, "sunken" or "outlined" look with a focus shadow instead of just a ring.

## Implementation Strategy

- **Decision**: Use Tailwind CSS v4 `@theme` block or custom CSS variables specifically for light mode.
- **Rationale**: This keeps the styling logic centralized and prevents "class bloat" in the component files.
- **Constraint Check**: Ensure no hardcoded hex codes are introduced in the component files; all should go into `globals.css`.
