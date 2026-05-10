import { describe, it, expect } from 'vitest'
import { formatDate, parseSearchQ, parseSearchStars } from './utils'

describe('parseSearchQ', () => {
  it('returns the string when valid', () => {
    expect(parseSearchQ('love')).toBe('love')
  })

  it('returns undefined for empty string', () => {
    expect(parseSearchQ('')).toBeUndefined()
  })

  it('returns undefined for non-string values', () => {
    expect(parseSearchQ(42)).toBeUndefined()
    expect(parseSearchQ(null)).toBeUndefined()
    expect(parseSearchQ(undefined)).toBeUndefined()
  })
})

describe('parseSearchStars', () => {
  it('returns a valid star rating', () => {
    expect(parseSearchStars(1)).toBe(1)
    expect(parseSearchStars(5)).toBe(5)
    expect(parseSearchStars('3')).toBe(3)
  })

  it('returns undefined for out-of-range values', () => {
    expect(parseSearchStars(0)).toBeUndefined()
    expect(parseSearchStars(6)).toBeUndefined()
  })

  it('returns undefined for non-integer values', () => {
    expect(parseSearchStars(2.5)).toBeUndefined()
    expect(parseSearchStars('bad')).toBeUndefined()
    expect(parseSearchStars(null)).toBeUndefined()
  })
})

describe('formatDate', () => {
  it('formats a date string', () => {
    expect(formatDate('2024-01-15')).toBe('Jan 15, 2024')
  })

  it('formats a Date object', () => {
    expect(formatDate(new Date(2024, 0, 15))).toBe('Jan 15, 2024')
  })

  it('accepts a custom format', () => {
    expect(formatDate('2024-01-15', 'yyyy/MM/dd')).toBe('2024/01/15')
  })
})
