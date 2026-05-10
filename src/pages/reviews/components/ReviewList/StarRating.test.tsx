import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StarRating } from './StarRating'

describe('StarRating', () => {
  it('renders 5 stars', () => {
    const { container } = render(<StarRating stars="5.00" />)
    expect(container.querySelectorAll('svg')).toHaveLength(5)
  })

  it('sets the accessible label', () => {
    render(<StarRating stars="3.00" />)
    expect(screen.getByLabelText('3 out of 5 stars')).toBeInTheDocument()
  })

  it('rounds a decimal star value', () => {
    render(<StarRating stars="4.50" />)
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument()
  })
})
