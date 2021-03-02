module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend:{
      fontFamily:{
        'dancingScript': ['Dancing Script', 'cursive']
      },
      colors:{
        transparent: 'transparent',
        'peach': '#F7C59F',
        'peach-light': '#efd2b1',
        'steel': '#5B85AA',
        'steel-light': '#8599b5',
        'steel-dark': '#314e5d',
        'space': '#2D3047',
        'aero': '#D7FDEC',
        'blueGreen': '#A2E8DD',
      }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
