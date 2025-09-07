import { useState } from 'react'
import { Palette, Check, Moon, Stethoscope, Heart } from 'lucide-react'
import { useTheme, Theme } from '../../contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes: { id: Theme; name: string; icon: React.ReactNode; description: string }[] = [
    {
      id: 'clinical-trust',
      name: 'Clinical Trust',
      icon: <Stethoscope className="h-4 w-4" />,
      description: 'Professional medical interface'
    },
    {
      id: 'warm-community',
      name: 'Warm Community',
      icon: <Heart className="h-4 w-4" />,
      description: 'Approachable community feel'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: <Moon className="h-4 w-4" />,
      description: 'Dark professional interface'
    }
  ]

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-sm"
        aria-label="Change theme"
      >
        <Palette className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-md shadow-lg z-50">
          <div className="p-2">
            <h3 className="text-sm font-medium mb-2 px-2 text-muted-foreground">Choose Theme</h3>
            <div className="space-y-1">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => handleThemeChange(themeOption.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {themeOption.icon}
                    <div className="text-left">
                      <div className="font-medium">{themeOption.name}</div>
                      <div className="text-xs text-muted-foreground">{themeOption.description}</div>
                    </div>
                  </div>
                  {theme === themeOption.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay to close menu when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}