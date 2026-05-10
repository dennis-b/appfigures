import { DEFAULT_SORT, PAGE_SIZE, REVIEWS_API_URL } from './reviews.api.constants'
import type { ReviewsParams, ReviewsResponse } from './reviews.api.types'

export async function fetchReviews(params: ReviewsParams): Promise<ReviewsResponse> {
  const { q, stars, page = 1, count = PAGE_SIZE, sort = DEFAULT_SORT } = params

  const searchParams = new URLSearchParams()
  searchParams.set('count', String(count))
  searchParams.set('page', String(page))
  searchParams.set('sort', sort)
  if (q) searchParams.set('q', q)
  if (stars != null) searchParams.set('stars', String(stars))

  const url = `${REVIEWS_API_URL}?${searchParams.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<ReviewsResponse>
}
