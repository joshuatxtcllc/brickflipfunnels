/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#4F46E5',
        accent: '#8B5CF6',
      },
    },
  },
  plugins: [],
}
