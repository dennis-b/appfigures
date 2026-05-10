import { useSearch } from '@tanstack/react-router'
import { Route } from '@/routes/reviews'
import { TotalsBadge } from '../Totals/TotalsBadge'
import { RatingSelect } from './RatingSelect'
import { SearchInput } from './SearchInput'

export function ReviewFilters() {
  const { stars } = useSearch({ from: Route.fullPath })

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1 flex-1">
          <span className="text-sm text-muted-foreground/60 text-left">Filter by keyword</span>
          <SearchInput />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground/60 text-left">Filter by rating</span>
          <RatingSelect value={stars} />
        </div>
      </div>
      <TotalsBadge />
    </div>
  )
}
