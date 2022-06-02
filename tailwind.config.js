const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: ["night", "forest", "halloween", "dark", "cupcake", "lemonade"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
