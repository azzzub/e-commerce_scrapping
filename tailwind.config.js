module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        18: '4.5rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
