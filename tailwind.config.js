/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  corePlugins: { preflight: false, container: false },

  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        steel: "var(--steel)",
        "steel-deep": "var(--steel-deep)",
        blue: "var(--blue)",
        ink: "var(--ink)",
        safety: "var(--safety)",
        line: "var(--line)",
        muted: "#3c4b57",
        "muted-2": "#5a6975",
        "muted-3": "#4b5a66",
        cool: "#e3e8ec",
        navy: "#2c4458",
        mist: "#c6d3dd",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
        circle: "50%",
      },
      boxShadow: {
        lift: "0 8px 20px rgba(31, 42, 51, 0.1)",
        "lift-hover": "0 16px 28px rgba(31, 42, 51, 0.16)",
        soft: "0 14px 26px rgba(31, 42, 51, 0.14)",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
        out: "ease-out",
      },
      keyframes: {
        "wx-spin": { to: { transform: "rotate(360deg)" } },
        "fc-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "wx-spin": "wx-spin 36s linear infinite",
        "fc-pulse": "fc-pulse 2.2s ease-out infinite",
      },
    },
  },
  plugins: [],
}
