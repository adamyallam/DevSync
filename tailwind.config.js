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
        'primary-text': '#D0E8E8',
        'secondary-text': '#89979E',
        'undertone': '#3A4042',
        'highlighted': '#282E2E',
        'selected': '#2F3636',
      },
    },
  },
  plugins: [],
}

