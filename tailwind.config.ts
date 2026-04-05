import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f9f5ff",
          600: "#9333ea",
          700: "#7e22ce",
        },
        pink: {
          600: "#ec4899",
          700: "#be185d",
        },
        indigo: {
          50: "#f0f4ff",
        },
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
        },
      },
    },
  },
  plugins: [],
};

export default config;
