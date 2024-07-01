/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fixed-2': 'repeat(2, 1fr)',
        'fixed-3': 'repeat(3, 1fr)',
        'fixed-5': 'repeat(5, 1fr)',
      },
      width: {
        '18': '4.5rem',
        '23': '5.75rem',
        '27': '6.75rem',
        '30': '7.5rem',
      },
      fontSize: {
        '14': ['14px'],
      },
    },
  },
  plugins: [],
}
