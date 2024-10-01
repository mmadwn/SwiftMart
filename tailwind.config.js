/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'text-title': ['Helvetica', 'sans-serif'],
        'text-title-bold': ['Helvetica-Bold', 'sans-serif'],
        'text-light': ['Helvetica-Light', 'sans-serif'],
        'text-oblique': ['Helvetica-Oblique', 'sans-serif'],
      },
    },
  },
  plugins: [],
}