import { createFileRoute } from '@tanstack/react-router'
import { parseSearchQ, parseSearchStars } from '@/utils'
import { ReviewsPage } from '@/pages/reviews/ReviewsPage'

export const Route = createFileRoute('/reviews')({
  validateSearch: (search: Record<string, unknown>) => ({
    q: parseSearchQ(search.q),
    stars: parseSearchStars(search.stars),
  }),
  component: ReviewsPage,
})
