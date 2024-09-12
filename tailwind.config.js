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
        'primary': '#363636',
        'secondary': '#ff9147',
        'offwhite': '#e3e3e3',
        'success': '#59b400',
        'error': '#ef4848',
        'noti': '#5e70f4',
      },
    },
  },
  plugins: [],
}

