import { Loader2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useIsLoadingReviews } from '@/api/reviews'
import { useSearchInput } from '@/pages/reviews/ReviewsPage.hooks'

export function SearchInput() {
  const isPending = useIsLoadingReviews()
  const { localValue, onChange, onClear } = useSearchInput()

  return (
    <div className="relative flex-1 min-w-0">
      <Input
        type="text"
        placeholder="Search reviews…"
        value={localValue}
        onChange={onChange}
        aria-label="Search reviews"
        className="pr-8"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {isPending ? (
          <Loader2 size={14} className="animate-spin text-muted-foreground" />
        ) : localValue ? (
          <button onClick={onClear} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
            <X size={14} />
          </button>
        ) : null}
      </div>
    </div>
  )
}
