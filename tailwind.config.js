/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9575CD',
        'primary-light': '#B39DDB',
        'primary-dark': '#7E57C2',
        secondary: '#F3E5F5',
        accent: '#4A148C',
        'text-primary': '#2C3E50',
        'text-secondary': '#546E7A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(149, 117, 205, 0.1), 0 2px 4px -1px rgba(149, 117, 205, 0.06)',
      },
    },
  },
  plugins: [],
};