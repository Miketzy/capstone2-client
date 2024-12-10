/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        animate2: {
          from: { transform: 'rotate(45deg)' },
          to: { transform: 'rotate(405deg)' },
        },
      },
      animation: {
        animate2: 'animate2 2s linear infinite',
      },
    },
  },
};
