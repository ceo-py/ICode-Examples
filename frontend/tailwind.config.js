const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',      
      'custom-sm': '400px', 
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',     
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

