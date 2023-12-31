/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#edf9ff",
          100: "#d6f1ff",
          200: "#b6e8ff",
          300: "#84dbff",
          400: "#4ac5ff",
          500: "#20a6ff",
          600: "#0987ff",
          700: "#026ef3",
          800: "#0958c4",
          900: "#0f4d99",
          950: "#0b2447",
        },
        midnight: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#bce4ff",
          300: "#8ed3ff",
          400: "#58b9ff",
          500: "#329aff",
          600: "#1b7bf5",
          700: "#1464e1",
          800: "#1750b6",
          900: "#19468f",
          950: "#19376d",
        },
        indigo: {
          50: "#f3f5fb",
          100: "#e3e9f6",
          200: "#cedaef",
          300: "#adc0e3",
          400: "#85a1d5",
          500: "#6883c9",
          600: "#576cbc",
          700: "#4a5aab",
          800: "#414b8c",
          900: "#384170",
          950: "#262a45",
        },
        secondary: {
          50: "#f3f9fc",
          100: "#e6f2f8",
          200: "#c7e5f0",
          300: "#a5d7e8",
          400: "#5cb7d4",
          500: "#389ebf",
          600: "#2780a2",
          700: "#216783",
          800: "#1f576d",
          900: "#1f495b",
          950: "#14303d",
        },
      },
    },
  },
  plugins: [],
};
