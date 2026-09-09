import { Archivo, Manrope } from 'next/font/google'

/**
 * Two families, no monospace.
 *
 * Archivo is a grotesque drawn for signage and industrial print, which is the
 * right physical object for a contractor: a site notice, a stencilled crate, a
 * specification sheet. It carries the display type and, at small sizes with
 * tabular figures, every number and label on the site.
 *
 * A mono face was here previously and has been removed on purpose. This is not
 * a developer tool; monospace on a building contractor reads as costume, and it
 * cost a third font file for the privilege.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
  preload: true,
})

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
})

export const fontVariables = [archivo.variable, manrope.variable].join(' ')
