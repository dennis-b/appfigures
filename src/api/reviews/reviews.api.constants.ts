export const REVIEWS_API_URL = import.meta.env.VITE_REVIEWS_API_URL as string
export const PAGE_SIZE = 25
export const DEFAULT_SORT = '-date'
export const SEARCH_DEBOUNCE_MS = 300

export const ReviewsQueryKey = {
  Reviews: 'reviews',
} as const
