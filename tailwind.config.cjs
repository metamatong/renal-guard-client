/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],

        /* Optional shortcut utility: `font-pretendard` */
        pretendard: ['Pretendard', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        gray: {
          ...colors.gray,
          50: '#FAFAFA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7289',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        blue: {
          ...colors.blue,
          50: '#C4DDFF',
          100: '#9BC5FF',
          200: '#73AEFF',
          300: '#4E99FF',
          400: '#2B83F7',
          500: '#2875DA',
          600: '#2367C1',
          700: '#1F5BAA',
          800: '#1A4D91',
          900: '#12386A',
          950: '#0A2C5A',
        }
      }
    },
  },
  plugins: [],
};