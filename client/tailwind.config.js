/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["Merriweather", "sans-serif"],
      },
    },
  },
  plugins: [],
};
