import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import {
  auditData,
  directorySize,
  formatBytes,
  resolveDataLocations,
} from '../../lib/data-audit.mjs'
import {
  buildMigrationPlan,
  normalizeTargetRoot,
  psQuote,
} from '../../lib/data-plan.mjs'
import {
  buildCleanupPlan,
  normalizeOlderThanDays,
} from '../../lib/data-clean.mjs'

test('data locations honour DSH_HOME and standard Windows folders', () => {
  const locations = resolveDataLocations({
    USERPROFILE: 'C:\\Users\\demo',
    APPDATA: 'C:\\Users\\demo\\AppData\\Roaming',
    LOCALAPPDATA: 'C:\\Users\\demo\\AppData\\Local',
    DSH_HOME: 'E:\\DSH',
    TEMP: 'E:\\DSH\\temp',
  })
  const byId = Object.fromEntries(locations.map((entry) => [entry.id, entry]))
  assert.equal(byId['harness-home'].path, 'E:\\DSH')
  assert.equal(byId['desktop-profile'].path, path.join('C:\\Users\\demo\\AppData\\Roaming', '@deepseek-ai', 'dsh-desktop'))
  assert.equal(byId['pnpm-store'].path, path.join('C:\\Users\\demo\\AppData\\Local', 'pnpm'))
  assert.equal(byId.temp.path, 'E:\\DSH\\temp')
  assert.equal(byId.temp.migrate, false)
  assert.equal(byId.temp.systemTemp, false)
  assert.equal(byId['system-temp'].path, path.join('C:\\Users\\demo\\AppData\\Local', 'Temp'))
  assert.equal(byId['system-temp'].cleanable, true)
  assert.equal(byId['system-temp'].systemTemp, true)
})

test('directorySize sums files without following child junctions', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-size-'))
  try {
    await fs.mkdir(path.join(root, 'nested'), { recursive: true })
    await fs.writeFile(path.join(root, 'a.txt'), 'hello')
    await fs.writeFile(path.join(root, 'nested', 'b.txt'), 'world!')
    const size = await directorySize(root)
    assert.equal(size.bytes, 11)
    assert.equal(size.approx, false)
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('auditData reports sizes, children and drives without writing', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-audit-'))
  const home = path.join(root, 'home')
  const desktop = path.join(root, 'Roaming', '@deepseek-ai', 'dsh-desktop')
  const local = path.join(root, 'Local')
  try {
    await fs.mkdir(path.join(home, 'profiles'), { recursive: true })
    await fs.writeFile(path.join(home, 'profiles', 'a.txt'), 'abc')
    await fs.mkdir(path.join(home, 'sessions'), { recursive: true })
    await fs.writeFile(path.join(home, 'sessions', 'b.txt'), '12345')
    await fs.mkdir(desktop, { recursive: true })
    await fs.writeFile(path.join(desktop, 'd.bin'), Buffer.alloc(8))
    await fs.mkdir(local, { recursive: true })
    const audit = await auditData({
      env: {
        USERPROFILE: root,
        APPDATA: path.join(root, 'Roaming'),
        LOCALAPPDATA: local,
        DSH_HOME: home,
        TEMP: path.join(root, 'temp'),
      },
    })
    assert.equal(audit.ok, true)
    const categories = Object.fromEntries(audit.categories.map((entry) => [entry.id, entry]))
    assert.equal(categories['harness-home'].exists, true)
    assert.ok(categories['harness-home'].bytes >= 8)
    assert.equal(categories['desktop-profile'].exists, true)
    assert.equal(categories['desktop-profile'].bytes, 8)
    const childNames = audit.children.map((entry) => entry.label)
    assert.deepEqual(childNames, ['profiles', 'sessions'])
    assert.ok(audit.drives.some((drive) => drive.drive === path.parse(root).root.replace(/[\\/]+$/, '')))
  } finally {
    await fs.rm(root, { recursive: true, force: true })
  }
})

test('migration plan only targets unmanaged, existing categories', () => {
  const audit = {
    ok: true,
    categories: [
      { id: 'harness-home', label: 'home', path: 'C:\\Users\\demo\\.dsh', exists: true, managed: true, bytes: 10, drive: 'C:' },
      { id: 'pnpm-cache', label: 'pnpm', path: 'C:\\Users\\demo\\AppData\\Local\\pnpm-cache', exists: true, managed: false, bytes: 20, drive: 'C:' },
      { id: 'npm-cache', label: 'npm', path: 'C:\\Users\\demo\\AppData\\Local\\npm-cache', exists: false, managed: false, bytes: 0, drive: 'C:' },
      { id: 'temp', label: 'temp', path: 'E:\\temp', exists: true, managed: false, bytes: 1, drive: 'E:' },
    ],
    unmanagedBytes: 20,
  }
  const plan = buildMigrationPlan({ targetRoot: 'E:\\DSHData', audit })
  assert.equal(plan.ok, true)
  assert.equal(plan.actions.length, 1)
  assert.equal(plan.actions[0].id, 'pnpm-cache')
  assert.equal(plan.actions[0].target, path.join('E:\\DSHData', 'pnpm-cache'))
  assert.ok(plan.skipped.some((entry) => entry.id === 'harness-home' && entry.reason === 'already-managed'))
  assert.ok(plan.skipped.some((entry) => entry.id === 'npm-cache' && entry.reason === 'missing'))
  assert.match(plan.script, /robocopy/)
  assert.match(plan.script, /New-Item -ItemType Junction/)
  assert.match(plan.script, /DSH 仍在运行/)
  assert.doesNotMatch(plan.script, /,\s*\n\s*\)/)
  assert.equal(plan.actions[0].bytesLabel, undefined) // decoration happens at the route boundary
})

test('migration plan rejects relative or overlapping roots', () => {
  assert.throws(() => normalizeTargetRoot('relative\\path'), /absolute/)
  const audit = {
    ok: true,
    categories: [
      { id: 'pnpm-cache', label: 'pnpm', path: 'E:\\DSHData\\pnpm-cache', exists: true, managed: false, bytes: 1, drive: 'E:' },
    ],
  }
  assert.throws(() => buildMigrationPlan({ targetRoot: 'E:\\DSHData', audit }), /overlaps/)
})

test('PowerShell quoting and byte formatting are stable', () => {
  assert.equal(psQuote("C:\\a'b"), "'C:\\a''b'")
  assert.equal(formatBytes(0), '0 B')
  assert.equal(formatBytes(1024), '1.00 KB')
  assert.equal(formatBytes(1024 * 1024 * 2.5), '2.50 MB')
})

test('cleanup plan is dry-run by default and only targets temp scopes', () => {
  const audit = {
    ok: true,
    categories: [
      { id: 'harness-home', exists: true, path: 'C:\\Users\\demo\\.dsh', migrate: false },
      { id: 'temp', exists: true, path: 'E:\\temp', cleanable: true },
      { id: 'system-temp', exists: true, path: 'C:\\Users\\demo\\AppData\\Local\\Temp', cleanable: true },
    ],
  }
  const plan = buildCleanupPlan({ audit, olderThanDays: 7 })
  assert.equal(plan.ok, true)
  assert.equal(plan.olderThanDays, 7)
  assert.deepEqual(plan.scopes.map((entry) => entry.id), ['temp', 'system-temp'])
  assert.match(plan.script, /\[switch\]\$Apply/)
  assert.match(plan.script, /dsh\[-_\]/)
  assert.match(plan.script, /Remove-Item/)
  assert.match(plan.script, /DeepSeek Harness/)
  assert.doesNotMatch(plan.script, /,\s*\n\s*\)/)
  assert.doesNotMatch(plan.script, /harness-home/)
  assert.equal(plan.script.includes('C:\\Users\\demo\\.dsh'), false)
})

test('cleanup day bounds match the documented 1..365 range', () => {
  assert.equal(normalizeOlderThanDays(undefined), 7)
  assert.equal(normalizeOlderThanDays('30'), 30)
  assert.throws(() => normalizeOlderThanDays(0), /between 1 and 365/)
  assert.throws(() => normalizeOlderThanDays(366), /between 1 and 365/)
  assert.throws(() => normalizeOlderThanDays(1.5), /integer/)
  assert.throws(() => buildCleanupPlan({
    audit: { ok: true, categories: [{ id: 'harness-home', exists: true }] },
  }), /no cleanable/)
})
