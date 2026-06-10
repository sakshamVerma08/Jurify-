import { Cormorant_Garamond, Outfit } from 'next/font/google'

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  variable: '--font-serif',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
})
