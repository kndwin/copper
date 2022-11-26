/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    require("windy-radix-palette"),
    require("tailwindcss-animate"),
    require("tailwindcss-radix"),
  ],
};
