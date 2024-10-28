/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/**/*.{html,ts}'
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
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
