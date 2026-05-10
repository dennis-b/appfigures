import { MessageSquare } from 'lucide-react'

interface ReviewListEmptyStateProps {
  hasFilters: boolean
}

export function ReviewListEmptyState({ hasFilters }: ReviewListEmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
      <MessageSquare size={32} className="opacity-40" />
      <p className="text-sm">
        No reviews found{hasFilters ? ' for your filters' : ''}.
      </p>
    </div>
  )
}
