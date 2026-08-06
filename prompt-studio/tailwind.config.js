/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#fafbfc',
          100: '#f2f3f5',
          200: '#e9eaed',
          300: '#dfe0e6',
        },
        ink: {
          300: '#9ca3af',
          400: '#8b8f99',
          500: '#6b7280',
          700: '#3a3d48',
          900: '#1f2937',
        },
        accent: {
          blue: '#4466f2',
          purple: '#7c3aed',
          pink: '#ec4899',
          cyan: '#06b6d4',
          green: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}