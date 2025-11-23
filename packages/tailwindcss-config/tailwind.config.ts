import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        brand: {
          sands: '#E7E6D7',
          soil: '#343028',
        },
        light: {
          light: '#F3EEE3',
          base: '#E7E6D7',
          dark: '#726A5A',
          darkest: '#343028',
        },
        dark: {
          light: '#7E7563',
          base: '#5C5547',
          dark: '#343028',
          darkest: '#22201A',
        },
        red: '#C55656',
        yellow: '#DF9F45',
        purple: '#7F69AE',
        green: '#16AB98',
        blue: '#2D73B4',
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
