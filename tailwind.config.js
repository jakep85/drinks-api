/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      keyframes: {
        fadeup: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spinner: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        fadeup: 'fadeup 0.3s ease-in-out infinite',
        spinner: 'spinner 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
