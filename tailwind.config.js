import daisyuiTheme from "./src/daisyui.theme";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-white": "#ffffff2b",
        "dark-grey": "#202123",
        "light-grey": "#353740",
        accent: "var(--accent-color)",
        neutral: "var(--neutral-color)",
      },
    },
  },
  daisyui: {
    themes: daisyuiTheme.themes, // Extract the themes array correctly
  },
  plugins: [daisyui],
};
