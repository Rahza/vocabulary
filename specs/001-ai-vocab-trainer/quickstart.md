# Quickstart: AI Vocabulary Trainer

## Prerequisites

- Node.js 18+
- npm or pnpm
- OpenAI API Key (for content generation)

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the App

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) in your browser.
3.  Go to **Settings** and enter your OpenAI API Key (stored in your browser's LocalStorage).

## Usage

1.  **Generate**: Go to "Generate", enter a theme (e.g., "Food"), difficulty, and count.
2.  **Learn**: Go to "Trainer" to start your daily session.
3.  **Practice**: Go to "Practice" to review specific tags without affecting your Leitner stats.

## Troubleshooting

- **API Errors**: Ensure your OpenAI key has credits and is correct. Check the browser console for details.
- **Data Reset**: To clear all data, clear your browser's LocalStorage or use the "Reset Data" button in Settings.
