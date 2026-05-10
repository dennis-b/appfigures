import { describe, it, expect } from 'vitest'
import { subDays, subMonths, startOfMonth, format } from 'date-fns'
import { groupReviewsByDate } from './reviews.grouping'
import type { Review } from '@/api/reviews'

function makeReview(id: string, date: Date): Review {
  return {
    id,
    date: date.toISOString(),
    title: 'Test',
    review: 'Body',
    original_title: '',
    original_review: '',
    author: 'User',
    stars: '5.00',
    version: null,
    iso: 'us',
  }
}

const now = new Date()

describe('groupReviewsByDate', () => {
  it('groups a today review under Today', () => {
    const reviews = [makeReview('1', now)]
    const groups = groupReviewsByDate(reviews, now)
    expect(groups[0].label).toBe('Today')
    expect(groups[0].reviews).toHaveLength(1)
  })

  it('groups a yesterday review under Yesterday', () => {
    const reviews = [makeReview('1', subDays(now, 1))]
    const groups = groupReviewsByDate(reviews, now)
    expect(groups[0].label).toBe('Yesterday')
  })

  it('groups an old review not matching any bucket under Older', () => {
    const veryOld = startOfMonth(subMonths(now, 40))
    const reviews = [makeReview('1', veryOld)]
    const groups = groupReviewsByDate(reviews, now)
    expect(groups[groups.length - 1].label).toBe('Older')
  })

  it('returns multiple groups for reviews from different periods', () => {
    const reviews = [
      makeReview('1', now),
      makeReview('2', subDays(now, 1)),
    ]
    const groups = groupReviewsByDate(reviews, now)
    expect(groups).toHaveLength(2)
    expect(groups[0].label).toBe('Today')
    expect(groups[1].label).toBe('Yesterday')
  })

  it('returns an empty array for no reviews', () => {
    expect(groupReviewsByDate([], now)).toEqual([])
  })

  it('groups a review from 3 months ago under the correct month label', () => {
    const threeMonthsAgo = startOfMonth(subMonths(now, 3))
    const expected = format(threeMonthsAgo, 'MMM yyyy')
    const reviews = [makeReview('1', threeMonthsAgo)]
    const groups = groupReviewsByDate(reviews, now)
    expect(groups[0].label).toBe(expected)
  })

  it('does not assign the same review to multiple groups', () => {
    const reviews = [makeReview('1', now)]
    const groups = groupReviewsByDate(reviews, now)
    const total = groups.reduce((sum, g) => sum + g.reviews.length, 0)
    expect(total).toBe(1)
  })
})
