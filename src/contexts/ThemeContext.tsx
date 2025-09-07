import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'clinical-trust' | 'warm-community' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('trb-theme-storage')
    return stored ? JSON.parse(stored).theme || 'clinical-trust' : 'clinical-trust'
  })

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('trb-theme-storage', JSON.stringify({ theme: newTheme }))
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const themes: Theme[] = ['clinical-trust', 'warm-community', 'dark']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

function applyTheme(theme: Theme) {
  // Remove existing theme classes
  document.documentElement.classList.remove('theme-clinical-trust', 'theme-warm-community', 'dark')
  
  // Apply new theme
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.add(`theme-${theme}`)
  }
  
  // Load theme-specific CSS variables
  loadThemeCSS(theme)
}

async function loadThemeCSS(theme: Theme) {
  // This would normally load theme-specific CSS files
  // For now, we'll use the existing CSS variables from .superdesign themes
  const themeMap = {
    'clinical-trust': 'theme_clinical_trust.css',
    'warm-community': 'theme_warm_community.css',
    'dark': 'default_ui_darkmode.css'
  }
  
  // In a real implementation, you might dynamically import CSS or switch CSS files
  // eslint-disable-next-line no-console
  console.log(`Loading theme: ${themeMap[theme]}`)
}