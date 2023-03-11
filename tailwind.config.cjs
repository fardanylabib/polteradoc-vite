/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
          xxs: "0.5rem"
      },
      colors: {
          brand: {
              100: '#3bd4b4',
              300: '#1fa1ad',
              400: '#1fa8b5',
              500: '#138691',
          },
          dark: {
              100: '#3f3f3f',
          },
      },
      dropShadow: {
          '3xl': '0 35px 35px rgba(0, 0, 0, 0.4)'
      }
    },
    fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
