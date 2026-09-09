# NameVibe ✨

NameVibe is a playful, frontend-only web application that generates entertaining "personality vibes" based on a person's name. It features a completely deterministic local inference engine, smooth animations, and a sleek, modern UI.

![NameVibe Preview](./public/preview.png)

## Features

- **Deterministic Engine**: The same name always yields the same result, utilizing a Mulberry32 PRNG seeded by string hashing.
- **No Backend**: Runs 100% locally in the browser with no databases, API calls, or real AI models.
- **Premium UI**: Built with Tailwind CSS and Framer Motion for a "SaaS-like" polished aesthetic.
- **Curated Profiles**: Specialized, culturally resonant profiles for known names alongside dynamically generated content for unknown names.
- **Native Sharing**: Integrated Web Share API for seamless viral sharing to social platforms.
- **Local History**: Persists recent searches locally using `localStorage`.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Ensure you have Node.js installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/namevibe.git
   cd namevibe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## Project Structure

- `src/engine/`: The deterministic core that processes names and generates vibe results.
- `src/data/`: Centralized trait pools, funny descriptions, and curated profiles.
- `src/components/`: Reusable, styled UI blocks.
- `src/pages/`: Main application views (Home, Loading, Result).

## Disclaimer

NameVibe is built purely for entertainment. The generated results are deterministic combinations of words and phrases based on the characters in the name and should not be treated as factual personality assessments. Have fun!

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
