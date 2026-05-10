# AppFigures - ChatGPT iOS Reviews

Browse and search ChatGPT iOS App Store reviews with keyword search, star rating filtering, and date-grouped results.

## Demo

[https://appfigures.vercel.app/](https://appfigures.vercel.app/)

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 |
| Build | Vite 8 |
| Language | TypeScript 6 |
| Routing | TanStack Router |
| Data fetching | TanStack Query |
| Styling | Tailwind CSS v4 + Shadcn/UI |
| Date utilities | date-fns |
| Toasts | Sonner |
| Utilities | react-use |

## Environment Variables

Before running the project, create a `.env` file in the root directory with the following variable:

```
VITE_REVIEWS_API_URL=<reviews_api_url>
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

## Notes

The exercise spec shows `rating` as the API query parameter (e.g. `?rating=4,5`), but the actual API response payload uses `stars` as the field name and the API itself only responds to `?stars=N`. Using `rating` returned unfiltered results, so `stars` is used throughout - in the URL, internal state, and API requests.

For large volumes of reviews, a virtualized list (e.g. [TanStack Virtual](https://tanstack.com/virtual)) would significantly improve rendering performance by only mounting visible items in the DOM. This was intentionally left out of the current solution to keep the implementation focused and straightforward - the "Load more" pagination already limits the number of rendered items in practice.

## Features

- Keyword search with debounce (300ms)
- Star rating filter (1–5 stars)
- Reviews grouped by date (Today, Yesterday, This week, etc.)
- Pagination - 25 reviews per page with "Load more"
- URL state sync - filters are shareable and survive page refresh
- Full browser back/forward support
- Error toasts via Sonner
