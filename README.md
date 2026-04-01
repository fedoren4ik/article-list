# Article List

A React + TypeScript article browser with live search, topic filtering, and sorting. Filter state is synced to the URL so results are shareable and survive browser navigation.

## Stack

- **React 19** — UI
- **TypeScript 5.9** — strict mode enabled
- **Vite 8** — dev server and build
- **Jest 30 + React Testing Library** — unit and integration tests
- **ESLint 9** — linting with `typescript-eslint` and `react-hooks` plugins

## Requirements

- **Node.js** `>=20.19.0` (Vite 8 requirement — run `nvm use` if you have a `.nvmrc`-aware shell)
- **Yarn** `>=1.22.0`

## Getting started

```bash
nvm use          # switches to Node 20.19.0 automatically if using nvm
yarn install
yarn dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start the development server |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Serve the production build locally |
| `yarn test` | Run tests with coverage |
| `yarn lint` | Run ESLint |

## Project structure

```
src/
├── components/
│   ├── articles/          # Main list view — search, filter, sort controls
│   └── article-card/      # Single article card
├── hooks/
│   ├── use-articles.ts    # Data fetching hook
│   └── use-search-params.ts  # URL search param state (popstate-aware)
├── utils/
│   ├── filter-articles.ts
│   ├── sort-articles.ts
│   ├── format-date.ts
│   └── capitalize.ts
├── types/                 # Shared TypeScript types
└── data/
    ├── articles-list.ts   # Static article data
    └── topics.ts          # TOPICS constant
```

## Features

- **Search** — filters by title, case-insensitive
- **Topic filter** — technology, finance, sports, health
- **Sort** — newest first, title A → Z, title Z → A
- **URL sync** — all filter state is stored in query params; Back/Forward works correctly

## Running tests

```bash
yarn test
```

Coverage report is written to `coverage/`. Tests cover loading state, search, filtering, sorting, and composed filter combinations.
