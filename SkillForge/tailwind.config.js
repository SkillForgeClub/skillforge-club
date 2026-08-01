/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(bg|border|text)-(blue|emerald|purple)-(300|400|500)(\/(10|20|60|70))?/,
      variants: ['hover', 'focus'],
    },
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",
        primary: "#3b82f6",
        secondary: "#8b5cf6"
      },
      fontFamily: {
        sans: ['Figtree', 'Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
