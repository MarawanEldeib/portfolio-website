import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        // Custom breakpoint between xl and 2xl for better zoom handling
        // At 125% zoom on 1920px screen: viewport = 1536px (shows desktop)
        // At 150% zoom on 1920px screen: viewport = 1280px (shows mobile)
        'nav-desktop': '1400px',
      },
    },
  },
  plugins: [],
};

export default config;
