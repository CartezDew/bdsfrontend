import tailwindcss from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'timberwolf': '#D8CBC7',
        'sinopia': '#CC3F0C',
        'golden-brown': '#9A6D38',
        'hunter-green': '#33673B',
        'eerie-black': '#19231A',
      }
    },
  },
  plugins: [],
}
