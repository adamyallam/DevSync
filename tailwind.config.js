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
        'secondary-text': '#A8B9C2',
        'undertone': '#636363',
        'highlighted': '#2D3030',
        'selected': '#414445',
        'button-hover': '#2F3636'
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

