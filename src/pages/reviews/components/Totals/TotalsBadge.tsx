import { useSearch } from '@tanstack/react-router'
import { useReviews } from '@/api/reviews'
import { Route } from '@/routes/reviews'

export function TotalsBadge() {
  const { q, stars } = useSearch({ from: Route.fullPath })
  const { data, isPending } = useReviews({ q, stars })

  if (isPending) {
    return <span className="text-sm text-muted-foreground">Loading…</span>
  }

  const total = data?.pages[0]?.total ?? 0
  const label = total === 1 ? '1 review' : `${total.toLocaleString()} reviews`

  return <span className="text-sm text-muted-foreground">{label}</span>
}
