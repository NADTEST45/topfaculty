/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#EBF5FB', 100: '#D4E6F1', 200: '#A9CCE3', 500: '#2E86C1', 600: '#2471A3', 700: '#1A5276', 800: '#1B4F72', 900: '#154360' },
        accent: { 500: '#F39C12', 600: '#E67E22' },
      },
    },
  },
  plugins: [],
}
