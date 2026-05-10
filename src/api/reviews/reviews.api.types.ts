export interface Review {
  id: string
  title: string
  review: string
  author: string
  date: string
  original_title: string
  original_review: string
  stars: string
  version: string | null
  iso: string
}

export interface ReviewsResponse {
  total: number
  pages: number
  this_page: number
  reviews: Review[]
}

export interface ReviewsParams {
  q?: string
  stars?: number
  page?: number
  count?: number
  sort?: string
}
