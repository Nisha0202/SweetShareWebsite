/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6aa84f',
        secondary: '#ff895b',
        accent: '#fce5cd',
        text: '#555555',
        background: '#fffff'
      },
      // Generate utility classes for custom colors
      utility: {
        colors: ['primary', 'secondary', 'accent', 'text', 'backgrounf'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};

