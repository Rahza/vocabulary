# Research & Technical Decisions: AI Vocabulary Trainer

## Technology Stack

- **Decision**: Next.js (App Router) + React + TypeScript
- **Rationale**: Modern, performance-focused, excellent developer experience, and requested by user. TypeScript ensures type safety.
- **Alternatives Considered**: Vue/Nuxt (user specified Next.js/React), Plain HTML/JS (too complex for this state management).

## Styling & Design

- **Decision**: Tailwind CSS + Lucide React (Icons) + Framer Motion (Animations)
- **Rationale**: Tailwind allows rapid development and "playful/colorful" customization. Lucide is standard, clean. Framer Motion enables "satisfying animations".
- **Design Approach**: Mobile-first, card-based UI for flashcards, vibrant color palette for groups/tags.

## Data Persistence

- **Decision**: Browser LocalStorage with a Repository Pattern
- **Rationale**: User requested local-only initially but wants future migration path to Firebase/Supabase.
- **Implementation**: `LocalStorageRepository` implementing a generic `IVocabularyRepository` interface. This allows swapping the implementation later without changing the UI/Service layer.
- **Schema**: JSON serialization of `VocabularyPair` and `LeitnerState` objects.

## AI Integration

- **Decision**: Direct client-side calls to OpenAI API using `openai` npm package or `fetch`.
- **Rationale**: Explicit user request ("Call it directly from the browser").
- **Risk**: Exposes API key if not handled carefully (user input or env var). For a local personal app, entering the key in Settings is acceptable.
- **Prompt Engineering**: Structured JSON output for vocabulary pairs + mnemonics.

## Learning Algorithm

- **Decision**: Leitner System (5 boxes)
- **Rationale**: Standard spaced repetition method.
- **Intervals**: Box 1 (Daily), Box 2 (Every 3 days), Box 3 (Weekly), Box 4 (Bi-weekly), Box 5 (Monthly).
- **Directionality**: Track separate Leitner state for DE->CZ and CZ->DE for each word.

## Input Handling

- **Decision**: Custom "Virtual Keyboard" bar above the standard keyboard or text input.
- **Rationale**: Mobile keyboards make accessing specific diacritics slow (long press). A dedicated row of buttons (ä, ö, ü, š, č, ř, etc.) improves UX significantly.
