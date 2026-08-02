import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TeamSection } from './TeamSection'

describe('TeamSection', () => {
  it('renders the team heading', () => {
    render(<TeamSection />)
    const heading = screen.getByText(/Meet the Team/i)
    expect(heading).toBeInTheDocument()
  })

  it('renders placeholder team members', () => {
    render(<TeamSection />)
    const members = screen.getAllByText(/Team member/i)
    expect(members.length).toBeGreaterThan(0)
  })
})
