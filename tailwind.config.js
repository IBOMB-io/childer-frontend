/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-cus': "url(src/assets/bg.png)"
      },
      colors: {
        'purple-cus': '#6C3BF4',
        'gold-cus': '#E0BF6A',
        'green-cus': '#8BC169',
        'red-cus': '#C16969',
      },
      width: {
        '293': "293px",
        '464': "464px",
        '625': "625px",
        '917': "917px",
      },
      height: {
        '589': "589px"
      },
      borderWidth: {
        '24': '24px',
        '12': '12px',
      },
    },
    fontFamily: {
      'sarabun': ['sarabun']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
}