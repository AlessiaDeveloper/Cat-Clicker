/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5D2E8C",
        secondary: "#FFF628",
        tertiary: "",
        white: "#FEF7F7",
      },
      fontFamily: {
        pregular: ["Luckiest Guy"],
      },
    },
  },
  plugins: [],
};
