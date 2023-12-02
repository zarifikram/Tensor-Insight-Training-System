/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '5%':'5%',
        '10%':'10%',
        '15%':'15%',
        '20%':'20%',
        '25%':'25%',
        '30%':'30%',
        '35%':'35%',
        '40%':'40%',
        '45%':'45%',
        '50%':'50%',
        '55%':'55%',
        '60%':'60%',
        '65%':'65%',
        '70%':'70%',
        '75%':'75%',
        '80%':'80%',
        '85%':'85%',
        '90%':'90%',
        '95%':'95%',
        '100%':'100%',
      },
      fontFamily:{
        'saira':'Saira Semi Condensed',
        'roboto':'Roboto&display'
      },
      colors:{
        'darkblue':'#161821',
        'darkshade':'#595E7640',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
}

