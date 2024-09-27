// styles/fonts.ts
import { Ubuntu, Racing_Sans_One, Roboto } from 'next/font/google'

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

export const racingSansOne = Racing_Sans_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})
