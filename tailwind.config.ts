import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f7f5f2',
        'bg-dark': '#1a1a18',
        accent: '#c8a96e',
        border: '#e0ddd8',
        'text-light': '#7a7a72',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
export default config
