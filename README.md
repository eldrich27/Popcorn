# 🍿 Popcorn

A React + TypeScript learning project: a movie search and review app inspired by the classic "usePopcorn" build. This repo tracks the app as it's built up commit by commit — navbar and search, collapsible movie/watched lists, responsive layout, and so on.

## Where the app lives

The actual application is in [popcorn/](popcorn/). See **[popcorn/README.md](popcorn/README.md)** for:

- current app state and what's still stubbed out (temp data vs. a real search API)
- tech stack, scripts (`dev` / `build` / `preview` / `lint`)
- project/component structure
- the `Movie` data model
- roadmap ideas

## Repo layout

```
Popcorn/
├── README.md          # this file — repo overview
└── popcorn/            # the Vite + React + TypeScript app
```

## Progress so far

Built incrementally, roughly in this order:

1. Navbar with logo and search box
2. Main layout accepting left/right box children
3. Collapsible boxes with temp movie data
4. Movie list + movie item components
5. Watched movie list + watched movie item components, split into their own components
6. Responsive header via media queries

See `git log` for the full commit history.
