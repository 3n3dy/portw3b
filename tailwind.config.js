/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080C10",
        "ink-2": "#0F1419",
        "ink-3": "#161C24",
        parchment: "#EEE8DC",
        "parchment-dim": "#A89E8C",
        muted: "#4A5568",
        lime: "#C8F135",
        "lime-dim": "#9BBF1F",
        border: "rgba(238,232,220,0.08)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Epilogue", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em",
      },
      
    },
  },
  plugins: [],
};
