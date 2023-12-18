/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.55rem'},
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

        'cp6-bg':'#0D1C1C',
        'cp6-cap':'#FFFFFF',
        'cp6-txt':'#FF6600',
        'cp6-box1':'#9C9191',
        'cp6-box2':'#F0E800',

        'cp7-bg':'#EAE4CF',
        'cp7-cap':'#646669',
        'cp7-txt':'#ADA998',
        'cp7-box1':'#DED9C9',
        'cp7-box2':'#9ABBCD',

        'cp8-bg':'#F35588',
        'cp8-cap':'#F0E9EC',
        'cp8-txt':'#94294C',
        'cp8-box1':'#DB4979',
        'cp8-box2':'#05DFD7',

        'cp9-bg':'#242933',
        'cp9-cap':'#F6F0E9',
        'cp9-txt':'#596172',
        'cp9-box1':'#1C222D',
        'cp9-box2':'#EC4C56',

        'cp10-bg':'#F8AD34',
        'cp10-cap':'#EEEEEE',
        'cp10-txt':'#333333',
        'cp10-box1':'#B12189',
        'cp10-box2':'#545454',
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

