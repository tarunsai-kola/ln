/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "primaryHover": "var(--primary-hover)",
        "primaryActive": "var(--primary-active)",
        "primarySoft": "var(--primary-soft)",
        "bg": "var(--bg)",
        "surface": "var(--surface)",
        "surface2": "var(--surface-2)",
        "surfaceSoft": "var(--surface-soft)",
        "border": "var(--border)",
        "text": "var(--text)",
        "textMuted": "var(--text-muted)",
        "textFaint": "var(--text-faint)",
        "accentBlue": "var(--accent-green-border)",
        "accentGold": "var(--subtle-panel)",
        "darkBg": "var(--dark-section-bg)",
        "darkText": "var(--dark-section-text)",
        "background-light": "#f8f6f6",
        "background-dark": "#221510",
        "surface-light": "#ffffff",
        "surface-dark": "#2c201d",
        "border-light": "#e8d5cf",
        "border-dark": "#4a3b36",
        "text-main": "#1c110d",
        "text-light": "#f3eae7",
      },
      fontFamily: {
        "display": ["Lexend", "sans-serif"]
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}