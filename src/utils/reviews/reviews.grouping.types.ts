import type { Review } from '@/api/reviews'

export interface DateGroup {
  label: string
  reviews: Review[]
}
