/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      width: {
        '18': '4.5rem',
        '23': '5.75rem',
      }
    },
  },
  plugins: [],
}
