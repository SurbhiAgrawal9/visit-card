/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '520px',
      },
      boxShadow: {
        'dark': '3px 3px 5px black',
        'dark-t': '2px -2px 6px',
      },
    },
  },
  plugins: [],
}