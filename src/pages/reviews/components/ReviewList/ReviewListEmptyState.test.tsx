import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReviewListEmptyState } from './ReviewListEmptyState'

describe('ReviewListEmptyState', () => {
  it('shows a generic message when no filters are active', () => {
    render(<ReviewListEmptyState hasFilters={false} />)
    expect(screen.getByText('No reviews found.')).toBeInTheDocument()
  })

  it('mentions filters when filters are active', () => {
    render(<ReviewListEmptyState hasFilters={true} />)
    expect(screen.getByText('No reviews found for your filters.')).toBeInTheDocument()
  })
})
