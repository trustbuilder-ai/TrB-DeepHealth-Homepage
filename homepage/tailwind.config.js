/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trust-building primary colors
        'trust-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#017A8D', // Primary teal
          600: '#005C65', // Darker teal
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        'medical-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#068262', // Medical authority green
          600: '#01382E', // Darker medical green
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'calm-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#00a3ff', // Bright calm blue
          600: '#025a80', // Medium calm blue
          700: '#223EAC', // Deep calm blue
          800: '#1e40af',
          900: '#869FFE', // Light gradient blue
        },
        // Emotional warmth accents
        'warm-peach': {
          50: '#fef7ed',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#F3B890', // Light peach
          400: '#ECA97C', // Primary peach
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'coral-alert': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ff6252', // Coral alert
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'therapeutic': ['Lato', 'Open Sans', 'sans-serif'],
      },
      fontSize: {
        'crisis': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'therapeutic': '0.75rem',
      },
      boxShadow: {
        'gentle': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'trust': '0 10px 15px -3px rgba(1, 122, 141, 0.1), 0 4px 6px -2px rgba(1, 122, 141, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}