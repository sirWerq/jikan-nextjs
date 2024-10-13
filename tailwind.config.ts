import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C4DAD2",
        secondary: "#E9EFEC",
        tertiary: "#16423C",
        quaternary: "#6A9C89",
      },
    },
  },
  plugins: [],
};
export default config;
