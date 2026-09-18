# 🍿 usePopcorn

A movie search and watchlist app, built while learning React + TypeScript. It's based on the classic "usePopcorn" project structure: search for movies, browse results, and keep track of what you've watched along with your own ratings.

## Current state

The UI shell is in place, but the two movie lists are still wired to temporary hardcoded data (`tempMovieData` / `tempWatchedData` in [Search.tsx](src/components/Box.tsx)) rather than a live search API. The search input in [NavBar](src/components/Search.tsx) doesn't yet filter or fetch anything.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and bundling
- [Oxlint](https://oxc.rs/) for linting

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```
src/
├── App.tsx              # Top-level layout: NavBar + Main
├── main.tsx             # React entry point
├── index.css            # Global styles
├── types/
│   └── Movie.tsx         # Movie interface shared across components
└── components/
    ├── NavBar.tsx        # Top nav bar container
    ├── Logo.tsx          # App logo/title
    ├── Search.tsx        # Search input + results count
    ├── Main.tsx          # Main content container
    ├── Box.tsx           # Collapsible LeftBox (search results) / RightBox (watched list)
    ├── List.tsx          # MovieList and WatchedMovieList (with rating averages)
    └── Item.tsx          # MovieItem and WatchedMovieItem row renderers
```

## Data model

```ts
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
}
```

## Roadmap ideas

- Wire `Search` up to a real movie API (e.g. OMDb) and drop the temp data
- Add "add to watched" / "remove from watched" interactions
- Persist the watched list (e.g. `localStorage`)
- Add a movie details view
