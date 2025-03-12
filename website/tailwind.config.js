// tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        gray: inverse(colors.gray),
        blue: inverse(colors.blue),
        white: '#000',
        black: '#fff',
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};

function inverse(obj) {
  const keys = Object.keys(obj)
    .map(v => parseInt(v))
    .sort((a, b) => {
      if (a === b) return 0;
      return a < b ? 1 : -1;
    });
  const n = {};

  for (let i = 0; i < keys.length; i++) {
    n[keys[i]] = obj[keys[keys.length - i - 1]];
  }

  return n;
}
