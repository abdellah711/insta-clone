/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      keyframes:{
        show: {
          '0%': {transform: 'scale(1.3)', opacity: .1}
        }
      },
      animation: {
        show: 'show .3s ease-out'
      },
    },
  },
  plugins: [],
}
