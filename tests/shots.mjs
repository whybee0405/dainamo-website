/**
 * Visual pass. Screenshots every route at three widths, records console errors
 * and any horizontal overflow, and writes everything to scratch/shots.
 *
 * node tests/shots.mjs [route ...]
 */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const BASE = process.env.BASE || 'http://localhost:3111'
const OUT = path.resolve('scratch/shots')

const ROUTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      '/',
      '/capabilities',
      '/capabilities/epoxy-and-resin-flooring',
      '/sectors',
      '/sectors/hospitals-and-healthcare',
      '/work',
      '/company',
      '/questions',
      '/site-assessment',
    ]

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, scale: 2 },
  { name: 'tablet', width: 768, height: 1024, scale: 2 },
  { name: 'desktop', width: 1440, height: 900, scale: 1 },
]

const slug = (route) => (route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '_'))

async function run() {
  await fs.mkdir(OUT, { recursive: true })
  const browser = await chromium.launch()
  const report = []

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.scale,
      hasTouch: viewport.name !== 'desktop',
      isMobile: viewport.name === 'mobile',
    })

    for (const route of ROUTES) {
      const page = await context.newPage()
      const problems = []
      page.on('console', (message) => {
        if (message.type() === 'error') problems.push(`console: ${message.text().slice(0, 200)}`)
      })
      page.on('pageerror', (error) => problems.push(`pageerror: ${String(error).slice(0, 200)}`))

      const response = await page.goto(`${BASE}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      })
      const status = response?.status() ?? 0

      await page.waitForTimeout(1400)

      // Above the fold, at rest.
      await page.screenshot({
        path: path.join(OUT, `${slug(route)}-${viewport.name}-fold.png`),
        animations: 'disabled',
      })

      const overflow = await page.evaluate(() => {
        const wide = document.documentElement.scrollWidth > window.innerWidth + 1
        if (!wide) return null
        const guilty = []
        document.querySelectorAll('body *').forEach((node) => {
          const box = node.getBoundingClientRect()
          if (box.width > 0 && box.right > window.innerWidth + 2) {
            guilty.push(
              `${node.tagName.toLowerCase()}.${String(node.className).split(' ')[0]} right=${Math.round(box.right)}`,
            )
          }
        })
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          guilty: guilty.slice(0, 6),
        }
      })

      // Full page only on desktop, otherwise the files get unmanageable.
      if (viewport.name !== 'tablet') {
        // Wheel events rather than scrollTo, because smooth scrolling owns the
        // scroll position and would swallow a programmatic jump. Without real
        // wheel input the in-view reveals never fire and everything below the
        // fold photographs blank.
        const height = await page.evaluate(() => document.body.scrollHeight)
        const steps = Math.ceil(height / (viewport.height * 0.75)) + 2
        for (let i = 0; i < steps; i += 1) {
          await page.mouse.wheel(0, viewport.height * 0.75)
          await page.waitForTimeout(180)
        }
        await page.waitForTimeout(900)
        await page.mouse.wheel(0, -height * 2)
        await page.waitForTimeout(900)
        await page.screenshot({
          path: path.join(OUT, `${slug(route)}-${viewport.name}-full.png`),
          fullPage: true,
          animations: 'disabled',
        })
      }

      report.push({ route, viewport: viewport.name, status, overflow, problems })
      await page.close()
    }

    await context.close()
  }

  await browser.close()

  const failures = report.filter(
    (row) => row.status !== 200 || row.overflow || row.problems.length > 0,
  )
  await fs.writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2))

  if (failures.length === 0) {
    console.log(`clean: ${report.length} page renders, no overflow, no console errors`)
  } else {
    console.log(`${failures.length} of ${report.length} renders need attention:\n`)
    for (const row of failures) {
      console.log(`${row.route} @ ${row.viewport}  status=${row.status}`)
      if (row.overflow) console.log(`  overflow ${JSON.stringify(row.overflow)}`)
      for (const problem of row.problems.slice(0, 4)) console.log(`  ${problem}`)
    }
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
