import tailwindScrollbar from 'tailwind-scrollbar';

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'brand-blue': '#007bff',
      'brand-green': '#28a745',
      // Define all your desired colors here
    },
  },
  plugins: [
    tailwindScrollbar,
  ],
}