/**
 * Static harness server for the shell de-duplication browser acceptance.
 *
 * Serves the fixture page plus the *built* plugin bundle, so a real Chromium
 * executes the same client.js the Host loads. Loopback only, read-only.
 *
 *   node test/browser/serve.mjs [port]      # default 55310
 *   → http://127.0.0.1:55310/shell.html
 */
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = fileURLToPath(new URL('.', import.meta.url))
const PLUGIN = fileURLToPath(new URL('../../', import.meta.url))
const PORT = Number(process.argv[2] || 55310)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
}

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1')
  const path = url.pathname === '/client.js'
    ? join(PLUGIN, 'client.js')
    : join(HERE, normalize(url.pathname).replace(/^[\\/]+/, ''))
  try {
    const body = readFileSync(path)
    response.writeHead(200, {
      'content-type': TYPES[extname(path)] || 'application/octet-stream',
      'cache-control': 'no-store',
    })
    response.end(body)
  } catch (error) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('not found: ' + url.pathname + ' (' + error.code + ')')
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('acceptance harness on http://127.0.0.1:' + PORT + '/shell.html')
})
