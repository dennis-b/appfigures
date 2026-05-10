import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  stars: string
  size?: number
}

export function StarRating({ stars, size = 18 }: StarRatingProps) {
  const count = Math.round(parseFloat(stars))
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < count
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  )
}
