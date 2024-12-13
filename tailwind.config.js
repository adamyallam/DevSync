/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "550" : '550px',
        "22" : '88px'
      },
      colors: {
        'primary': '#212526',
        'secondary': '#383C3D',
        'primary-text': '#DBDADA',
        'secondary-text': '#89979E',
        'undertone': '#636363',
        'highlighted': '#282E2E',
        'selected': '#2F3636',
      },
    },
  },
  plugins: [],
}

