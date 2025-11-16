module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cb: {
          navy: "#0D2449",
          "navy-dark": "#010A1A",
          "navy-light": "#24497A",
          gold: "#D4A83B",
          "gold-light": "#FFD677",
          "gold-muted": "#A67D2C",
          gray100: "#F8FAFC",
          gray300: "#CFD8E3",
          gray500: "#94A3B8",
          gray700: "#334155",
          gray900: "#0F172A",
          danger: "#DC2626",
          warning: "#F59E0B",
          success: "#16A34A",
          info: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
};
