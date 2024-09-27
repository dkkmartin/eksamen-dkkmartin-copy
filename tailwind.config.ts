import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'light-gray': '#EAEAEA',
        'dark-purple': '#5E2E53',
        'light-purple': '#E1A1E9',
      },
      fontSize: {
        '18': '18px',
        '24': '24px',
        '36': '36px',
      },
    },
  },
  plugins: [],
}
export default config
