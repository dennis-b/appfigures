import { ReviewFilters } from './components/Filters/ReviewFilters'
import { ReviewList } from './components/ReviewList/ReviewList'

export function ReviewsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      <header className="py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          ChatGPT iOS Reviews
        </h1>
      </header>

      <ReviewFilters />
      <div className="mt-6">
        <ReviewList />
      </div>
    </div>
  )
}
