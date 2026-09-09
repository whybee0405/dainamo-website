/**
 * Quality gate. Walks every route and checks the things that are easy to break
 * and expensive to miss: heading order, alt text, contrast on real rendered
 * colours, touch target size, link names, and duplicate call-to-action intent.
 */
import { chromium } from '@playwright/test'

const BASE = process.env.BASE || 'http://localhost:3111'
const ROUTES = [
  '/',
  '/capabilities',
  '/capabilities/epoxy-and-resin-flooring',
  '/sectors',
  '/sectors/hospitals-and-healthcare',
  '/work',
  '/company',
  '/questions',
  '/site-assessment',
  '/privacy',
]

const AUDIT = () => {
  const problems = []

  const srgb = (c) => {
    const v = c / 255
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  }
  const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
  const parse = (value) => {
    const m = value.match(/rgba?\(([^)]+)\)/)
    if (!m) return null
    const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number)
    return { rgb: parts.slice(0, 3), a: parts.length > 3 ? parts[3] : 1 }
  }
  const behind = (el) => {
    let node = el
    while (node && node !== document.documentElement) {
      const style = getComputedStyle(node)
      // A gradient background computes as a transparent backgroundColor, so a
      // section painted with one declares its real ground for this check.
      const bg = parse(style.backgroundColor)
      if (bg && bg.a > 0.85) return bg.rgb
      const declared = style.getPropertyValue('--audit-bg').trim()
      if (declared) return declared.split(/[\s,]+/).map(Number)
      node = node.parentElement
    }
    return [255, 255, 255]
  }
  const ratio = (a, b) => {
    const la = lum(a)
    const lb = lum(b)
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
  }

  // 1. Heading order
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
  const h1s = headings.filter((h) => h.tagName === 'H1')
  if (h1s.length !== 1) problems.push(`heading: expected exactly one h1, found ${h1s.length}`)
  let previous = 0
  for (const heading of headings) {
    const level = Number(heading.tagName[1])
    if (previous && level > previous + 1) {
      problems.push(
        `heading: jumped h${previous} to h${level} at "${heading.textContent?.trim().slice(0, 40)}"`,
      )
    }
    previous = level
  }

  // 2. Images need alt text
  for (const img of document.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) problems.push(`image: no alt attribute on ${img.currentSrc || img.src}`)
    else if (img.alt.trim() === '' && !img.closest('[aria-hidden="true"]'))
      problems.push(`image: empty alt on a meaningful image ${img.src.slice(-40)}`)
  }

  // 3. Contrast on visible text against the surface it actually sits on.
  //    Text over photography is skipped, because a scrim, not a colour pair,
  //    is what carries it.
  const seen = new Set()
  for (const el of document.querySelectorAll('p, a, span, li, h1, h2, h3, h4, button, label, dt, dd')) {
    if (el.children.length > 0 && el.textContent?.trim() !== el.firstChild?.textContent?.trim())
      continue
    const text = el.textContent?.trim()
    if (!text || text.length < 3) continue
    const style = getComputedStyle(el)
    if (style.visibility === 'hidden' || style.display === 'none') continue
    if (Number(style.opacity) < 0.9) continue
    const box = el.getBoundingClientRect()
    if (box.width === 0 || box.height === 0) continue
    if (el.closest('.sector-tile, .hero__plate, .compare, .cursor-layer')) continue

    const fg = parse(style.color)
    if (!fg || fg.a < 0.9) continue
    const bg = behind(el)
    const size = parseFloat(style.fontSize)
    const bold = Number(style.fontWeight) >= 700
    const large = size >= 24 || (size >= 18.66 && bold)
    const need = large ? 3 : 4.5
    const got = ratio(fg.rgb, bg)
    const key = `${style.color}|${bg.join(',')}|${large}`
    if (got < need && !seen.has(key)) {
      seen.add(key)
      problems.push(
        `contrast: ${got.toFixed(2)}:1 needs ${need}:1 — ${style.color} on rgb(${bg.join(',')}) at ${size}px — "${text.slice(0, 40)}"`,
      )
    }
  }

  // 4. Target size. WCAG 2.2 AA asks for 24x24 CSS pixels; anything that is a
  //    primary control is held to the 44px platform guideline instead. Links
  //    that sit inside a run of prose are exempt under the spec.
  const coarse = matchMedia('(pointer: coarse)').matches
  for (const el of document.querySelectorAll('a, button, input, select, [role="button"]')) {
    if (el.closest('[aria-hidden="true"], .form__trap, .compare')) continue
    if (el.closest('p, .prose, .form__legal, .site-footer__areas')) continue
    const style = getComputedStyle(el)
    if (style.display === 'inline' || style.visibility === 'hidden') continue
    const box = el.getBoundingClientRect()
    if (box.width === 0 || box.height === 0) continue

    const primary =
      el.classList.contains('btn') || el.matches('input:not([type="hidden"]), select, textarea')
    const min = primary || coarse ? 44 : 24

    // A text link's width is set by its label, so only its height is a design
    // decision. Square and icon-only controls are checked in both directions.
    const textual = Boolean(el.textContent?.trim()) && !primary
    const tooSmall = textual
      ? box.height < min - 0.5
      : box.height < min - 0.5 || box.width < min - 0.5

    if (tooSmall) {
      problems.push(
        `target: ${Math.round(box.width)}x${Math.round(box.height)} needs ${min} on ${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} "${el.textContent?.trim().slice(0, 24)}"`,
      )
    }
  }

  // 5. Every interactive element needs an accessible name
  for (const el of document.querySelectorAll('a, button')) {
    const name =
      el.getAttribute('aria-label') ||
      el.textContent?.trim() ||
      el.querySelector('img')?.getAttribute('alt') ||
      ''
    if (!name) problems.push(`name: no accessible name on ${el.outerHTML.slice(0, 70)}`)
  }

  // 6. One label per call-to-action intent
  const contactish =
    /get in touch|contact us|let'?s talk|start a project|reach out|enquire now|book now|get a quote/i
  const dupes = [...document.querySelectorAll('a.btn, button.btn')]
    .map((el) => el.textContent?.trim())
    .filter((label) => label && contactish.test(label))
  if (dupes.length) problems.push(`cta: competing contact labels ${JSON.stringify([...new Set(dupes)])}`)

  // 7. Content that is present but invisible.
  //    A scroll reveal that never fires leaves real content clipped to nothing.
  //    Nothing else in this suite catches that: there is no overflow, no console
  //    error, and the element is skipped by the contrast pass because it has no
  //    area. So check it directly.
  for (const el of document.querySelectorAll('.reveal-wipe')) {
    const r = el.getBoundingClientRect()
    const onScreen = r.top < window.innerHeight && r.bottom > 0 && r.height > 0
    if (onScreen && !el.hasAttribute('data-shown')) {
      problems.push(
        `hidden: a reveal in the viewport never fired, content is clipped to nothing (.${String(el.className).split(' ').slice(-1)})`,
      )
    }
  }
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect()
    const onScreen = r.top < window.innerHeight && r.bottom > 0
    if (!onScreen) continue
    const clipped = getComputedStyle(img).clipPath
    if (r.width < 2 || r.height < 2) {
      problems.push(`hidden: image renders at ${Math.round(r.width)}x${Math.round(r.height)} — ${img.currentSrc.split('/').pop()}`)
    } else if (clipped.includes('100%')) {
      problems.push(`hidden: image fully clipped — ${img.currentSrc.split('/').pop()}`)
    }
  }

  // 8. Em dashes
  const body = document.body.innerText
  if (body.includes('—')) {
    const at = body.indexOf('—')
    problems.push(`typography: em dash near "${body.slice(Math.max(0, at - 30), at + 30)}"`)
  }

  return problems
}

const browser = await chromium.launch()
let total = 0

for (const width of [390, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: width === 390 ? 844 : 900 },
    isMobile: width === 390,
    hasTouch: width === 390,
  })
  for (const route of ROUTES) {
    const page = await context.newPage()
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)
    const problems = await page.evaluate(AUDIT)
    if (problems.length) {
      total += problems.length
      console.log(`\n${route} @ ${width}px`)
      for (const problem of problems) console.log(`  ${problem}`)
    }
    await page.close()
  }
  await context.close()
}

await browser.close()
console.log(total === 0 ? '\naudit clean' : `\n${total} findings`)
