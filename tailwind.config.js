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
        '589': "589px",
        '500': "500px"
      },
      borderWidth: {
        '24': '24px',
        '12': '12px',
      },
      padding: {
        '18': "75.9px"
      }
    },
    fontFamily: {
      'sarabun': ['sarabun']
    },
    screens: {
      'mobile': '320px',
      'tablet': '481px',
      'laptop': '769px',
      'desktop': '1024px'
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')
  ],
}