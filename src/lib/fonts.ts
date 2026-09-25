import { Geist } from 'next/font/google'

/**
 * One family, variable weight.
 *
 * Geist is a neutral, tightly drawn grotesque. It carries display type at 600
 * with negative tracking, reading text at 400, and every figure with tabular
 * numerals, so the whole site reads as one engineered document rather than a
 * pairing that has to be kept in balance.
 */
export const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
})

export const fontVariables = geist.variable
