import { access, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

const requiredFiles = [
  'index.html',
  'resume.html',
  'robots.txt',
  'sitemap.xml',
  'README.md',
  'LICENSE'
]

const requiredSections = ['hero', 'about', 'connect', 'family', 'resume', 'projects', 'faq']
const requiredExternalProjects = [
  'https://www.showmeresultsonly.com',
  'https://www.pandadumpsters.com',
  'https://www.marketmattersonline.com',
  'https://www.goldenstripunite.com',
  'https://ccherosc.github.io/ArtsDominos-v2/',
  'https://ccherosc.github.io/uberia-sidescroller/',
  'https://www.angln.com',
  'https://pixelant.netlify.app',
  'https://skywriter.netlify.app',
  'https://dsweep.netlify.app',
  'https://buzzard-roost-daily-cast-v2.pages.dev/'
]

function fail(message) {
  console.error(`✗ ${message}`)
  process.exitCode = 1
}

function ok(message) {
  console.log(`✓ ${message}`)
}

function findLocalPaths(html) {
  const results = new Set()
  const regex = /(?:src|href)="([^"]+)"/g
  for (const match of html.matchAll(regex)) {
    const value = match[1]
    if (!value) continue
    if (value.startsWith('http://') || value.startsWith('https://')) continue
    if (value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('#')) continue
    if (value.startsWith('data:')) continue
    if (value.includes('${')) continue
    const normalized = value.startsWith('/') ? value.slice(1) : value
    const cleanPath = normalized.split('#')[0].split('?')[0]
    if (!cleanPath) continue
    results.add(cleanPath)
  }
  return [...results]
}

for (const file of requiredFiles) {
  try {
    await access(path.join(root, file))
    ok(`Required file present: ${file}`)
  } catch {
    fail(`Missing required file: ${file}`)
  }
}

const indexHtml = await readFile(path.join(root, 'index.html'), 'utf8')
const resumeHtml = await readFile(path.join(root, 'resume.html'), 'utf8')
const readme = await readFile(path.join(root, 'README.md'), 'utf8')

if (!indexHtml.includes('<link rel="canonical" href="https://johnsuchjr.com/">')) {
  fail('index.html is missing the canonical johnsuchjr.com URL')
} else {
  ok('Canonical URL points to johnsuchjr.com')
}

for (const section of requiredSections) {
  if (!indexHtml.includes(`id="${section}"`)) {
    fail(`Missing required section id="${section}" in index.html`)
  } else {
    ok(`Found required section: ${section}`)
  }
}

for (const projectUrl of requiredExternalProjects) {
  if (!indexHtml.includes(projectUrl)) {
    fail(`Missing featured project link: ${projectUrl}`)
  }
}
if (!process.exitCode) ok(`Found all ${requiredExternalProjects.length} featured project links`)

if (!readme.includes('https://johnsuchjr.com')) {
  fail('README.md should include the live site URL')
} else {
  ok('README includes the live site URL')
}

const localAssets = new Set([...findLocalPaths(indexHtml), ...findLocalPaths(resumeHtml)])
for (const asset of localAssets) {
  try {
    const fullPath = path.join(root, asset)
    const info = await stat(fullPath)
    if (!info.isFile()) {
      fail(`Referenced asset is not a file: ${asset}`)
    }
  } catch {
    fail(`Referenced asset is missing: ${asset}`)
  }
}
if (!process.exitCode) ok(`Verified ${localAssets.size} referenced local assets`)

const rootEntries = ['WAT_Claude.md', 'Web Design Claude.md', 'writing-profile.md', 'docs/superpowers']
for (const entry of rootEntries) {
  try {
    await access(path.join(root, entry))
    fail(`Internal planning artifact should not remain in the public root: ${entry}`)
  } catch {
    ok(`Internal planning artifact moved out of public root: ${entry}`)
  }
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log('\nAll site checks passed.')
