import puppeteer from 'puppeteer'
import { mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const projects = [
  { slug: 'showmeresultsonly', url: 'https://www.showmeresultsonly.com' },
  { slug: 'pandadumpsters',    url: 'https://www.pandadumpsters.com' },
  { slug: 'marketmattersonline', url: 'https://www.marketmattersonline.com' },
  { slug: 'goldenstripunite',  url: 'https://www.goldenstripunite.com' },
  { slug: 'artsdominos',       url: 'https://ccherosc.github.io/ArtsDominos-v2/' },
  { slug: 'angln',             url: 'https://www.angln.com' },
  { slug: 'buzzardroost',      url: 'https://buzzard-roost-daily-cast-v2.pages.dev/' },
]

const outDir = join(__dirname, 'images', 'projects')
await mkdir(outDir, { recursive: true })

const browser = await puppeteer.launch({ headless: 'new' })

for (const { slug, url } of projects) {
  console.log(`Capturing ${url}...`)
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise(r => setTimeout(r, 1000))
    await page.screenshot({
      path: join(outDir, `${slug}.png`),
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    })
    console.log(`  ✓ ${slug}.png saved`)
  } catch (e) {
    console.log(`  ✗ ${slug} failed: ${e.message}`)
    // Copy placeholder so the build doesn't break
    const { copyFile } = await import('fs/promises')
    await copyFile(join(__dirname, 'images', 'john-such.jpg'), join(outDir, `${slug}.png`)).catch(() => {})
  }
  await page.close()
}

await browser.close()
console.log('\nDone. Screenshots saved to images/projects/')
