/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 300ms ease-out",
        "fade-out": "fade-out 300ms ease-in forwards",
        "bounce-up": "bounce-up 400ms ease-in-out",
        scaleBounce: 'scaleBounce 0.6s ease-in-out',
        shake: "shake 400ms ease-out",
      },
      colors: {
        lightGray: "#EFEFE6",
        darkGray: "#5A594E",
      },
      keyframes: {
        scaleBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(3)' }, // Adjust the scale factor as needed
        },
        "bounce-up": {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        shake: {
          "0%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(-5px)",
          },
          "50%": {
            transform: "translateX(5px)",
          },
          "75%": {
            transform: "translateX(-5px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
}

