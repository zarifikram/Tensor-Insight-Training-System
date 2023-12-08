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

        'cp1-bg':'#FDF6E3',
        'cp1-cap':'#181819',
        'cp1-txt':'#2AA198',
        'cp1-box1':'#E2D8BE',
        'cp1-box2':'#859900',

        'cp2-bg':'#132237',
        'cp2-cap':'#1CBAAC',
        'cp2-txt':'#0B4C6C',
        'cp2-box1':'#0E1A29',
        'cp2-box2':'#EBB723',

        'cp3-bg':'#000000',
        'cp3-cap':'#D1FFCD',
        'cp3-txt':'#006500',
        'cp3-box1':'#032000',
        'cp3-box2':'#15FF00',

        'cp4-bg':'#313131',
        'cp4-cap':'#F5E6C8',
        'cp4-txt':'#616161',
        'cp4-box1':'#2B2B2B',
        'cp4-box2':'#F66E0D',

        'cp5-bg':'#415E31',
        'cp5-cap':'#F7F1D6',
        'cp5-txt':'#EDE5B4',
        'cp5-box1':'#38502A',
        'cp5-box2':'#6A994E',
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

