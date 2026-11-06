#!/usr/bin/env node
/**
 * Build client.js from src/client/*.js.
 *
 * The Client bundle is one classic script that hands a factory to
 * window.__ModuleLoader__; the sources share one closure, so their top-level
 * declarations are concatenated in file-name order and `export` keywords are
 * stripped. `--check` verifies that the checked-in client.js matches the
 * sources and passes node --check.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'src', 'client')
const target = join(root, 'client.js')
const check = process.argv.includes('--check')

const files = readdirSync(sourceDir)
  .filter((name) => name.endsWith('.js'))
  .sort()

if (files.length === 0) {
  console.error('build-client: no sources found in src/client')
  process.exit(1)
}

const chunks = files.map((name) => {
  const text = readFileSync(join(sourceDir, name), 'utf8')
  return {
    name,
    // Sources stay ESM for Node unit tests; the Client bundle is one classic
    // script sharing a closure, so import lines are stripped and the names
    // resolve through concatenation order.
    text: text
      .replace(/^\s*import\b[^\n]*\n/gm, '')
      .replace(/\bexport\s+(?=(const|let|var|function|class)\b)/g, '')
      .replace(/^\s*export\s*\{[^}]*\}\s*;?\s*$/gm, '')
      .trimEnd(),
  }
})

const output = chunks.map((chunk) => chunk.text).join('\n\n') + '\n'
const banner = `/* dsh-claude-mode client bundle — generated from src/client/*.js; do not edit directly. */\n`

if (check) {
  let current = ''
  try {
    current = readFileSync(target, 'utf8')
  } catch {
    console.error('build-client: client.js is missing; run npm run build:client')
    process.exit(1)
  }
  const expected = (current.startsWith(banner) ? current : banner + output)
  if (expected !== current) {
    console.error('build-client: client.js is out of date; run npm run build:client')
    process.exit(1)
  }
  execFileSync(process.execPath, ['--check', target], { stdio: 'inherit' })
  console.log(`build-client: client.js is current (${files.length} source files)`)
  process.exit(0)
}

writeFileSync(target, banner + output, 'utf8')
execFileSync(process.execPath, ['--check', target], { stdio: 'inherit' })
console.log(`build-client: wrote client.js from ${files.length} source files (${output.length} bytes)`)
