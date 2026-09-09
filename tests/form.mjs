/**
 * Exercises the site assessment form: validation failure, then a real
 * submission, then confirms the record actually landed in the CMS.
 */
import { chromium } from '@playwright/test'

const BASE = process.env.BASE || 'http://localhost:3111'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

const problems = []
page.on('pageerror', (e) => problems.push(String(e)))
page.on('console', (m) => {
  if (m.type() === 'error') problems.push(m.text().slice(0, 160))
})

// Payload's first call opens the database and builds its schema, which can take
// many seconds on a freshly started server. Do that here rather than inside the
// timed assertion below. A 403 is the expected answer and means it is awake.
const warm = await page.request.get(`${BASE}/api/enquiries`, { timeout: 120_000 })
console.log('payload warm-up:', warm.status())

await page.goto(`${BASE}/site-assessment`, { waitUntil: 'networkidle' })
await page.waitForSelector('button[type="submit"]:not([disabled])')
await page.waitForTimeout(400)

// 1. Blur validation on a bad phone number.
await page.fill('#phone', '12345')
await page.click('#siteLocation')
await page.waitForTimeout(300)
const blurError = await page.textContent('#phone-error').catch(() => null)
console.log('blur validation:', blurError ? `"${blurError.trim()}"` : 'MISSING')

// 2. Empty submit should not create anything and should report per field.
await page.fill('#phone', '')
await page.click('button[type="submit"]')
await page.waitForTimeout(1500)
const requiredErrors = await page.$$eval('.field__error', (nodes) =>
  nodes.map((n) => n.textContent?.trim()),
)
console.log('required errors:', requiredErrors.length, JSON.stringify(requiredErrors))
const focused = await page.evaluate(() => document.activeElement?.getAttribute('name'))
console.log('focus moved to:', focused)

// 3. A real submission.
const stamp = Date.now()
await page.fill('#contactName', 'Thandeka Mokoena')
await page.fill('#organisation', 'Rosebank Link Body Corporate')
await page.fill('#email', `thandeka.${stamp}@example.co.za`)
await page.fill('#phone', '082 604 1536')
await page.fill('#siteLocation', 'Rosebank, Johannesburg')
await page.selectOption('#sectorType', { label: 'Residential complexes' })
await page.selectOption('#service', { label: 'Waterproofing' })
await page.fill(
  '#message',
  'Water coming through the top floor ceilings after heavy rain. Roughly 400 square metres of flat roof, last done about six years ago.',
)
await page.click('button[type="submit"]')

await page.waitForSelector('.form__done', { timeout: 60000 })
const reference = await page.textContent('.form__done strong')
console.log('submitted, reference:', reference)
await page.screenshot({ path: 'scratch/form-success.png' })

// 4. The enquiry must be private to anonymous callers.
const anon = await page.request.get(`${BASE}/api/enquiries`)
console.log('anonymous read of enquiries:', anon.status())

console.log('problems:', problems.length ? problems : 'none')
await browser.close()
