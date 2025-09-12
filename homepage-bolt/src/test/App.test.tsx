import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'
import { ThemeProvider } from '../contexts/ThemeContext'

describe('App', () => {
  it('renders the main heading', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )
    
    expect(screen.getByText('TrB-DeepHealth')).toBeDefined()
  })
})