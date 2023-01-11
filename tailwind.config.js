/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    screens: {
      'xs': {
        max: '380px'
      },

      'sm': {
        max: '640px'
      },

      'lg': {
        max: '768px'
      },

      'm': {
        max: '1050px'
      },

      'xl': {
        max: '1280px'
      },

      '3xl': {
        min: '1750px'
      }
    },

    extend: {
      colors: {
        'soft-black': '#1C1C1C'
      },

      boxShadow: {
        'main': '0px 0px 7px 1px #00000030'
      },

      minWidth: {
        '1': '100px',
        '1.5': '150px',
        '2': '200px',
        '2.5': '250px',
        '3': '300px',
        '3.5': '350px',
        '4': '400px',
        '4.5': '450px',
        '5': '500px',
        '5.5': '550px',
        '6': '600px',
        '6.5': '650px',
        '7': '700px',
        '7.5': '750px',
        '8': '800px',
      },

      transitionProperty: {
        'border': 'border-width, border-color'
      },

      fontFamily: {
        'source-sans-pro': 'Source Sans Pro'
      }
    },
  },
  plugins: [],
}
