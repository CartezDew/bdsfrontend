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
        'hunter-green': ' #2a5a2f',
        'eerie-black': '#19231A',
      }
    },
  },
  plugins: [],
}
