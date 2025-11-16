const plugin = require("tailwindcss/plugin")

const formFieldPlugin = plugin(({ addComponents }) => {
  addComponents({
    ".form-field-token": {
      "@apply":
        "w-full min-h-[44px] rounded-cb-sm border border-cb-gray500 bg-cb-gray700 px-3 py-2.5 text-base text-white shadow-cb-sm transition-colors placeholder:text-cb-gray500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cb-gold focus-visible:ring-offset-2 focus-visible:border-cb-gold disabled:cursor-not-allowed disabled:opacity-60 md:text-sm",
    },
    ".form-field-token[data-state=error], .form-field-token[data-field-state=error]": {
      "@apply":
        "border-cb-danger focus-visible:ring-cb-danger focus-visible:border-cb-danger",
    },
    ".form-field-token[data-state=success], .form-field-token[data-field-state=success]": {
      "@apply":
        "border-cb-success focus-visible:ring-cb-success focus-visible:border-cb-success",
    },
  })
})

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
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
  plugins: [formFieldPlugin],
};
