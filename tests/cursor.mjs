/**
 * Confirms the pointer companion takes over on a precise pointer, reports the
 * right state for each kind of target, and stays out of the way entirely when
 * reduced motion is requested or the pointer is coarse.
 */
import { chromium, devices } from '@playwright/test'

const BASE = process.env.BASE || 'http://localhost:3111'
const browser = await chromium.launch()

async function stateOver(page, selector) {
  const target = page.locator(selector).first()
  // The element has to be in the viewport, otherwise the pointer move is
  // clamped and the previous state is read back as a false pass.
  await target.scrollIntoViewIfNeeded()
  await page.waitForTimeout(700)
  const box = await target.boundingBox()
  if (!box) return 'NOT FOUND'
  const y = Math.min(box.y + box.height / 2, 880)
  await page.mouse.move(box.x + box.width / 2, y)
  await page.waitForTimeout(260)
  return page.getAttribute('.cursor-ring', 'data-state')
}

// --- precise pointer -------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.mouse.move(700, 400)
  await page.waitForTimeout(500)

  const active = await page.evaluate(() => ({
    layer: !!document.querySelector('.cursor-layer'),
    htmlFlag: document.documentElement.classList.contains('has-cursor'),
    bodyCursor: getComputedStyle(document.body).cursor,
  }))
  console.log('desktop takeover:', JSON.stringify(active))

  console.log('over page background:', await stateOver(page, '.position__body p'))
  console.log('over nav link:      ', await stateOver(page, '.site-header__link'))
  console.log('over primary CTA:   ', await stateOver(page, '.hero__actions .btn-primary'))
  console.log('over sector tile:   ', await stateOver(page, '.sector-tile__link'))
  console.log('over comparison:    ', await stateOver(page, '.compare'))

  // Pressed feedback. Release away from the link, otherwise press-and-release
  // on the same element is a click and the test navigates itself off the page.
  const box = await page.locator('.hero__actions .btn-primary').boundingBox()
  await page.mouse.move(box.x + 10, box.y + 10)
  await page.mouse.down()
  await page.waitForTimeout(160)
  const pressed = await page.getAttribute('.cursor-ring', 'data-pressed')
  await page.mouse.move(box.x + 10, box.y - 120)
  await page.mouse.up()
  console.log('pressed attribute:  ', pressed)

  await page.screenshot({ path: 'scratch/cursor-desktop.png', clip: { x: 0, y: 0, width: 1440, height: 900 } })

  // The hero calls to action sit over a full-bleed drag control. Reporting the
  // right cursor state is not proof the click lands, so click it for real.
  await page.locator('.hero__actions .btn-primary').click()
  await page.waitForURL('**/site-assessment', { timeout: 10_000 })
  console.log('hero CTA click:     ', new URL(page.url()).pathname)

  await page.goBack({ waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(600)
  await page.locator('.hero__actions .btn-secondary').click()
  await page.waitForURL('**/capabilities', { timeout: 10_000 })
  console.log('hero secondary:     ', new URL(page.url()).pathname)

  await page.close()
}

// --- reduced motion --------------------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.mouse.move(700, 400)
  await page.waitForTimeout(400)
  const out = await page.evaluate(() => ({
    layer: !!document.querySelector('.cursor-layer'),
    bodyCursor: getComputedStyle(document.body).cursor,
  }))
  console.log('reduced motion:', JSON.stringify(out), '(expect layer:false, cursor:auto)')
  await page.close()
}

// --- touch device ----------------------------------------------------------
{
  const context = await browser.newContext({ ...devices['iPhone 14 Pro'] })
  const page = await context.newPage()
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const out = await page.evaluate(() => ({
    layer: !!document.querySelector('.cursor-layer'),
    bodyCursor: getComputedStyle(document.body).cursor,
  }))
  console.log('touch device:  ', JSON.stringify(out), '(expect layer:false, cursor:auto)')
  await context.close()
}

await browser.close()
