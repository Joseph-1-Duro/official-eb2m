import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google"

export const playFont = Playfair_Display({
  variable: "--font-playfair",
  subsets: ['latin'],
  display: 'swap'
})

export const jakartaFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ['latin'],
  display: 'swap'
})