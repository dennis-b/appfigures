import type { DateGroup } from '@/utils/reviews/reviews.grouping.types'
import { ReviewCard } from './ReviewCard'

interface ReviewGroupProps {
  group: DateGroup
}

export function ReviewGroup({ group }: ReviewGroupProps) {
  return (
    <section className="mb-8">
      <h2 className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-2 mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {group.label}
      </h2>
      <div className="flex flex-col gap-3">
        {group.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  )
}
