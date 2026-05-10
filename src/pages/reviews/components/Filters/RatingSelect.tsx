import { useNavigate } from '@tanstack/react-router'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { STAR_LABELS, STAR_RATINGS } from '@/constants'
import { Route } from '@/routes/reviews'

interface RatingSelectProps {
  value?: number
}

export function RatingSelect({ value }: RatingSelectProps) {
  const navigate = useNavigate({ from: Route.fullPath })

  function onChange(val: string | null) {
    const stars = !val || val === 'all' ? undefined : Number(val)
    void navigate({
      search: (prev) => ({ ...prev, stars }),
    })
  }

  return (
    <Select value={value != null ? String(value) : 'all'} onValueChange={onChange}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="All ratings" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All ratings</SelectItem>
        {STAR_RATINGS.map((star) => (
          <SelectItem key={star} value={String(star)}>
            {STAR_LABELS[star]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
