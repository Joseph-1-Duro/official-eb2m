import { Plus_Jakarta_Sans, Zilla_Slab } from "next/font/google"

export const zillaFont = Zilla_Slab({
  variable: "--font-zilla",
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export const jakartaFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ['latin'],
  display: 'swap'
})