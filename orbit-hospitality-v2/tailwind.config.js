/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orbit-dark": "#0a0a0a",
        "orbit-gold": "#c5a059",
        "orbit-gray": "#2a2a2a",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },
      animation: {
        "slow-pan": "pan 20s linear infinite",
      },
      keyframes: {
        pan: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".stroke-text-gold": {
          "-webkit-text-stroke": "2px #c5a059",
        },
      });
    },
  ],
};
