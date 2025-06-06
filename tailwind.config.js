/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
