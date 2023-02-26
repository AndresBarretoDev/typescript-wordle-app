/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray-light': '#F3F3F3',
        'gray-light-d': '#D3D6DA',
        'gray-lighter': '#DADCE0',
        'gray-lightest': '#F3F3F3E3',
        'gray-dark': '#939B9F',
        'gray-darker': '#202537',
        'gray-darker-89': '#262B3CE3',
        'gray-darker-01': '#565F7E',
        'gray-01': '#818181',
        'gray-02': '#939B9F33',
        'gray-03': '#DADCE008',
        'gray-04': '#939B9F4D',
        'gray-05': '#DADCE04D',
        'gray-06': '#f3f3f3cc',
        black: '#000000',
        'black-2': '#262B3C',
        'success-light': '#66A060',
        'success-dark': '#6AAA64',
        'blue-dark': '#565F7E',
        warning: '#CEB02C',
      },
    },
  },
  plugins: [],
}
