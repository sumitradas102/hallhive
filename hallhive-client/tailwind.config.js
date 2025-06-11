/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
        heading: ['Lato', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}