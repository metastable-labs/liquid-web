import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#020617",
          100: "#64748B",
          150: "#EAEEF4",
          200: "#CAC2FF",
          250: "#EEEBFF",
          300: "#2B1664",
          350: "#4691FE",
          400: "#1E293B",
          450: "#375DFB",
          500: "#F1F5F9",
          550: "#E2E8F0",
          600: "#F8FAFC",
          650: "#CBF5E5",
          700: "#EFFAF6",
          750: "#F5CBCB",
          800: "#FAEDEF",
          850: "#611515",
          900: "#156146",
        },
      },
      boxShadow: {
        nav: "0px 0px 20px -6px rgba(15, 23, 42, 0.12)",
      },
    },
    fontFamily: {
      Aeonik: ["Aeonik"],
    },
  },
  plugins: [],
} satisfies Config;
