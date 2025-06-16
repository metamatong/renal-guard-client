/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        /* Make Pretendard the default sans stack */
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],

        /* Optional shortcut utility: `font-pretendard` */
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};