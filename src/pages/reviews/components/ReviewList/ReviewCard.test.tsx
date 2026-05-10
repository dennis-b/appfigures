import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Review } from '@/api/reviews'
import { ReviewCard } from './ReviewCard'

const review: Review = {
  id: '1',
  title: 'Great app',
  review: 'Really enjoy using it every day.',
  original_title: '',
  original_review: '',
  author: 'Alice',
  date: '2024-03-10T00:00:00Z',
  stars: '5.00',
  version: '1.2.3',
  iso: 'us',
}

describe('ReviewCard', () => {
  it('renders the title', () => {
    render(<ReviewCard review={review} />)
    expect(screen.getByText('Great app')).toBeInTheDocument()
  })

  it('renders the author', () => {
    render(<ReviewCard review={review} />)
    expect(screen.getByText(/Alice/)).toBeInTheDocument()
  })

  it('renders the star rating label', () => {
    render(<ReviewCard review={review} />)
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument()
  })

  it('renders the formatted date', () => {
    render(<ReviewCard review={review} />)
    expect(screen.getByText(/Mar 10, 2024/)).toBeInTheDocument()
  })

  it('renders the version when present', () => {
    render(<ReviewCard review={review} />)
    expect(screen.getByText(/v1\.2\.3/)).toBeInTheDocument()
  })

  it('omits the title when empty', () => {
    render(<ReviewCard review={{ ...review, title: '' }} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })
})
