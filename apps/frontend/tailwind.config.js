/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFCA1A',
        secondary: '#2c3c54',
      },
    },
  },
  plugins: [],
  important: true,
};
