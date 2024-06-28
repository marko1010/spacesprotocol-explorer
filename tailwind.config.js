/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import typeography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    typeography
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "halloween", "business", "sunset", "coffee", "night", "dim", "luxury"],
  },
}

