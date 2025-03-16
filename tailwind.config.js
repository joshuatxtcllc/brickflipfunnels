/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
        secondary: {
          500: '#4F46E5',
          600: '#4338CA'
        },
        accent: {
          500: '#8B5CF6',
          600: '#7C3AED'
        }
      },
      boxShadow: {
        'glow': '0 0 15px -3px rgba(99, 102, 241, 0.25)',
      }
    },
  },
  plugins: [],
}
