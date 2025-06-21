/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ 반드시 src 하위로 설정
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}