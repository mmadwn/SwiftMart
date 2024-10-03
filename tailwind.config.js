/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'h-regular': ['Helvetica', 'sans-serif'],
        'h-bold': ['Helvetica-Bold', 'sans-serif'],
        'h-light': ['Helvetica-Light', 'sans-serif'],
        'h-oblique': ['Helvetica-Oblique', 'sans-serif'],
      },
    },
  },
  plugins: [],
}