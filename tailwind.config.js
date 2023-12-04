/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "sw-dark": "#181719",
        "sw-dark-medium": "#27242C",
        "sw-dark-light": "#3D3A41",
        "sw-green": "#34D9A8",
        "sw-blue": "#4282F1",
        "sw-white": "#E5ECFB",
      }
    },
  },
  plugins: [],
}

