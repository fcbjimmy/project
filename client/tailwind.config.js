/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
      width: {
        100: "30rem",
        104: "34rem",
        108: "38rem",
      },
      screens: {
        mdmax: { max: "768px" },
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        forestGreen: "#30596A",
        forest: "#1F4564",
      },
    },
  },
  plugins: [],
};
