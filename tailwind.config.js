/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    borderWidth: {
      '24': '24px',
      '12': '12px',
    },
    extend: {
      backgroundImage: {
        'bg-cus': "url(src/assets/bg.png)"
      },
      colors: {
        'purple-cus': '#6C3BF4',
        'gold-cus': '#E0BF6A',
      },
      width: {
        '293': "293px",
        '625': "625px",
        '917': "917px",
      },
      height: {
        '589': "589px"
      }
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