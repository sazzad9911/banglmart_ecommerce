/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
     'MainColor' :'#5dade2',
     'MainColorHover' :'#489fb4',
     'TextColor':'#1C2833',
     'SubTextColor':'#566573',
     'BackgroundColor':'#EAEDED',
     'BorderColor':'#FAD7A0',
     'CardColor':'#fff'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

