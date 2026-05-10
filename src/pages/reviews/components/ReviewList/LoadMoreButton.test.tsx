import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoadMoreButton } from './LoadMoreButton'

describe('LoadMoreButton', () => {
  it('shows "Load more" when not loading', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={false} />)
    expect(screen.getByRole('button', { name: 'Load more' })).toBeInTheDocument()
  })

  it('shows "Loading…" and is disabled when loading', () => {
    render(<LoadMoreButton onClick={() => {}} isLoading={true} />)
    const btn = screen.getByRole('button', { name: 'Loading…' })
    expect(btn).toBeDisabled()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<LoadMoreButton onClick={onClick} isLoading={false} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })
})
