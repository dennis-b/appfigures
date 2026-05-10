import {
  isToday,
  isYesterday,
  startOfDay,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
  isWithinInterval,
  isBefore,
  format,
} from 'date-fns'
import { keyBy } from 'lodash'
import type { Review } from '@/api/reviews'
import type { DateGroup } from './reviews.grouping.types'

function isThisWeek(date: Date, now: Date): boolean {
  const weekStart = startOfWeek(now, { weekStartsOn: 1 })
  return (
    isWithinInterval(date, { start: weekStart, end: startOfDay(now) }) &&
    !isToday(date) &&
    !isYesterday(date)
  )
}

function isLastWeek(date: Date, now: Date): boolean {
  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 })
  return isWithinInterval(date, { start: lastWeekStart, end: lastWeekEnd })
}

function isThisMonth(date: Date, now: Date): boolean {
  const monthStart = startOfMonth(now)
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 })
  return (
    isWithinInterval(date, { start: monthStart, end: now }) &&
    isBefore(date, thisWeekStart) &&
    !isLastWeek(date, now)
  )
}

function isLastMonth(date: Date, now: Date): boolean {
  const lastMonth = subMonths(now, 1)
  return isWithinInterval(date, {
    start: startOfMonth(lastMonth),
    end: endOfMonth(lastMonth),
  })
}

interface Bucket {
  label: string
  test: (date: Date) => boolean
}

function buildBuckets(now: Date): Bucket[] {
  const buckets: Bucket[] = [
    { label: 'Today', test: (d) => isToday(d) },
    { label: 'Yesterday', test: (d) => isYesterday(d) },
    { label: 'This week', test: (d) => isThisWeek(d, now) },
    { label: 'Last week', test: (d) => isLastWeek(d, now) },
    { label: 'This month', test: (d) => isThisMonth(d, now) },
    { label: 'Last month', test: (d) => isLastMonth(d, now) },
  ]

  for (let i = 2; i <= 38; i++) {
    const target = subMonths(now, i)
    const start = startOfMonth(target)
    const end = endOfMonth(target)
    const label = format(target, 'MMM yyyy')
    buckets.push({
      label,
      test: (d) => isWithinInterval(d, { start, end }),
    })
  }

  return buckets
}

export function groupReviewsByDate(reviews: Review[], now: Date = new Date()): DateGroup[] {
  const buckets = buildBuckets(now)

  const { assigned, groups } = buckets.reduce(
    ({ assigned, groups }, bucket) => {
      const matched = reviews.filter((r) => !assigned[r.id] && bucket.test(new Date(r.date)))
      if (matched.length === 0) return { assigned, groups }
      return {
        assigned: { ...assigned, ...keyBy(matched, 'id') },
        groups: [...groups, { label: bucket.label, reviews: matched }],
      }
    },
    { assigned: {} as Record<string, Review>, groups: [] as DateGroup[] },
  )

  const unmatched = reviews.filter((r) => !assigned[r.id])
  return unmatched.length > 0 ? [...groups, { label: 'Older', reviews: unmatched }] : groups
}
