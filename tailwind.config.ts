import type {Config} from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "color-change": "colorChange 1s infinite",
        "color-change-rainbow": "colorChangeRainbow 3s infinite",
        pulseBorder: "pulseBorder 1.5s infinite",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": {color: "rgb(239, 68, 68)"}, // rojo
          "49%": {color: "rgb(59, 130, 246)"}, // azul
        },
        redPulse: {
          "0%, 100%": {color: "rgb(239, 68, 68)"}, // rojo
          "49%": {color: "rgb(239, 88, 88)"}, // azul
        },
        colorChangeRainbow: {
          "0%, 100%": {color: "rgb(239, 68, 68)"}, // rojo
          "16.67%": {color: "rgb(255, 165, 0)"}, // naranja
          "33.33%": {color: "rgb(255, 255, 0)"}, // amarillo
          "50%": {color: "rgb(0, 128, 0)"}, // verde
          "66.67%": {color: "rgb(0, 100, 255)"}, // azul
          "83.33%": {color: "rgb(125, 50, 140)"}, // índigo
          "100%": {color: "rgb(255, 130, 238)"}, // violeta
        },
        pulseBorder: {
          "0%": {boxShadow: "0 0 0 0 rgba(246, 246, 246, 0.3)"},
          "50%": {boxShadow: "0 0 10px 5px rgba(246, 246, 246, 0.1)"},
          "100%": {boxShadow: "0 0 0 0 rgba(246, 246, 246, 0.0)"},
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
