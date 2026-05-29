import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { extname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PORT = process.env.PORT || 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
}

const CACHE = {
  '.html': 'no-cache',
  '.pdf':  'no-cache',
}

const IMMUTABLE = new Set(['.png', '.jpg', '.jpeg', '.webp', '.woff2', '.woff', '.ico'])

createServer(async (req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0])
  const filePath = join(__dirname, urlPath)
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403); res.end('Forbidden'); return
  }
  try {
    const data = await readFile(filePath)
    const ext  = extname(filePath)
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': CACHE[ext] ?? (IMMUTABLE.has(ext) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600'),
    }
    if (ext === '.pdf') headers['Content-Disposition'] = 'inline'
    res.writeHead(200, headers)
    res.end(data)
  } catch (e) {
    if (e.code === 'ENOENT') { res.writeHead(404); res.end('Not found') }
    else                     { res.writeHead(500); res.end('Server error') }
  }
}).listen(PORT, () => console.log(`Serving at http://localhost:${PORT}`))
