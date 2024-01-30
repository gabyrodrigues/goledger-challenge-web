import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        primary: "#F231A5",
        secondary: "#06092B",
        darkPrimary: "#DA0D89",
        background: "#020202",
        lightGray: "#A7A7A7",
        gray: "#242424",
        darkGray: "#121212",
        white: "#FAFAFA",
        black: "#020202"
      }
    }
  },
  plugins: []
};
export default config;
