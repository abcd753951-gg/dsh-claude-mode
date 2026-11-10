/**
 * Data & storage audit for the Claude mode settings surface.
 *
 * This module is deliberately read-only. It resolves the user-visible data
 * locations the Harness and its desktop shell write, measures them with hard
 * entry/time budgets, and reports whether each path is a junction to another
 * drive. It never creates, moves, or deletes anything; migration is a separate
 * generated script the user reviews and runs while the app is stopped.
 */

import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

/** Top-level directories worth separating in the UI. */
export const HOME_CHILDREN = Object.freeze([
  'profiles',
  'sessions',
  'attachments',
  'cache',
  'logs',
  'dsh-runtimes',
  'speech-to-text',
  'storages',
  'skills',
])

/** One bounded audit is enough to answer the UI; avoid scanning forever. */
const MAX_ENTRIES = 120000
const MAX_DEPTH = 24
const CATEGORY_BUDGET_MS = 4000
const CHILD_BUDGET_MS = 2000

/**
 * Resolve the writable locations this plugin knows about. `path` is the
 * user-visible location; `targetName` is the child folder under the selected
 * data root that a migration would use.
 *
 * @param {Record<string, string | undefined>} env
 * @returns {object[]}
 */
export function resolveDataLocations(env = process.env) {
  const userHome = env.USERPROFILE || env.HOME || os.homedir()
  const appData = env.APPDATA || path.join(userHome, 'AppData', 'Roaming')
  const localAppData = env.LOCALAPPDATA || path.join(userHome, 'AppData', 'Local')
  const dshHome = env.DSH_HOME && env.DSH_HOME.trim()
    ? env.DSH_HOME.trim()
    : path.join(userHome, '.dsh')
  const temp = env.TEMP && env.TEMP.trim()
    ? env.TEMP.trim()
    : env.TMP && env.TMP.trim()
      ? env.TMP.trim()
      : path.join(localAppData, 'Temp')
  const systemTemp = path.join(localAppData, 'Temp')
  const tempIsSystem = samePath(temp, systemTemp)
  const locations = [
    {
      id: 'harness-home',
      label: 'DSH 主数据目录',
      path: dshHome,
      targetName: 'harness-home',
      role: 'active',
      migrate: true,
      detail: 'profiles / sessions / attachments / logs / runtimes',
    },
    {
      id: 'desktop-profile',
      label: 'DSH 桌面端数据',
      path: path.join(appData, '@deepseek-ai', 'dsh-desktop'),
      targetName: 'desktop-profile',
      role: 'app-data',
      migrate: true,
      detail: 'Electron userData、缓存、本地存储',
    },
    {
      id: 'updater-cache',
      label: 'DSH 更新器缓存',
      path: path.join(localAppData, '@deepseek-aidsh-desktop-updater'),
      targetName: 'updater-cache',
      role: 'cache',
      migrate: true,
      detail: '下载的安装包与更新缓存',
    },
    {
      id: 'pnpm-store',
      label: 'pnpm 全局目录',
      path: path.join(localAppData, 'pnpm'),
      targetName: 'pnpm-store',
      role: 'tool-cache',
      migrate: true,
      detail: 'pnpm 的全局 bin 与 store 目录；实际 store-dir 可能由配置指向别处',
    },
    {
      id: 'pnpm-cache',
      label: 'pnpm 缓存',
      path: path.join(localAppData, 'pnpm-cache'),
      targetName: 'pnpm-cache',
      role: 'tool-cache',
      migrate: true,
      detail: 'pnpm 下载缓存',
    },
    {
      id: 'npm-cache',
      label: 'npm 缓存',
      path: path.join(localAppData, 'npm-cache'),
      targetName: 'npm-cache',
      role: 'tool-cache',
      migrate: true,
      detail: 'npm 与插件工具下载缓存',
    },
    {
      id: 'temp',
      label: tempIsSystem ? '系统临时目录' : 'DSH 临时目录',
      path: temp,
      targetName: 'temp',
      role: 'temp',
      migrate: false,
      cleanable: true,
      systemTemp: tempIsSystem,
      detail: tempIsSystem
        ? '系统临时文件；只清理旧的 DSH 临时项，不做 junction'
        : '当前进程的 TEMP/TMP；建议由启动器设置到数据盘',
    },
  ]
  if (!tempIsSystem) {
    locations.push({
      id: 'system-temp',
      label: '系统临时目录',
      path: systemTemp,
      targetName: 'system-temp',
      role: 'temp',
      migrate: false,
      cleanable: true,
      systemTemp: true,
      detail: 'Windows 通用临时目录；普通 exe 启动的 DSH 会回写这里',
    })
  }
  return locations
}

function samePath(left, right) {
  return path.resolve(String(left || '')).toLowerCase() === path.resolve(String(right || '')).toLowerCase()
}

/** Convert a raw path to a display-safe absolute path. */
export function absolutePath(value, base = process.cwd()) {
  return path.resolve(base, String(value == null ? '' : value))
}

function driveOf(value) {
  const parsed = path.parse(String(value || ''))
  return parsed.root ? parsed.root.replace(/[\\/]+$/, '') : ''
}

async function exists(file) {
  try {
    await fs.lstat(file)
    return true
  } catch {
    return false
  }
}

async function readLinkTarget(file) {
  try {
    return await fs.readlink(file)
  } catch {
    return null
  }
}

async function realPath(file) {
  try {
    return await fs.realpath(file)
  } catch {
    return null
  }
}

/**
 * Sum files below a directory without following child junctions. The root
 * itself is followed so a managed junction reports the bytes of its target.
 *
 * @param {string} directory
 * @returns {Promise<{bytes: number, entries: number, approx: boolean}>}
 */
export async function directorySize(directory, options = {}) {
  const result = { bytes: 0, entries: 0, approx: false }
  const deadline = Number(options.deadline) > 0 ? Number(options.deadline) : Infinity
  const budget = Number(options.maxEntries) > 0 ? Number(options.maxEntries) : MAX_ENTRIES
  let stack = [directory]
  while (stack.length > 0) {
    if (result.entries >= budget || Date.now() > deadline) {
      result.approx = true
      break
    }
    const current = stack.pop()
    let entries
    try {
      entries = await fs.readdir(current, { withFileTypes: true })
    } catch {
      continue
    }
    for (const entry of entries) {
      result.entries += 1
      if (result.entries >= budget || Date.now() > deadline) {
        result.approx = true
        break
      }
      const child = path.join(current, entry.name)
      let info
      try {
        info = await fs.lstat(child)
      } catch {
        continue
      }
      if (info.isSymbolicLink()) continue
      if (info.isFile()) {
        result.bytes += info.size
      } else if (info.isDirectory() && result.entries < budget) {
        stack.push(child)
      }
    }
    if (result.approx) break
  }
  return result
}

/**
 * Inspect one category. A missing path is a normal result, not an error.
 *
 * @param {object} category
 * @param {{budgetMs?: number}} options
 */
export async function inspectLocation(category, options = {}) {
  const budget = Number(options.budgetMs) > 0 ? Number(options.budgetMs) : CATEGORY_BUDGET_MS
  const location = category.path
  const item = {
    id: category.id,
    label: category.label,
    path: location,
    targetName: category.targetName,
    role: category.role,
    migrate: category.migrate !== false,
    cleanable: category.cleanable === true,
    systemTemp: category.systemTemp === true,
    detail: category.detail || '',
    exists: false,
    managed: false,
    linkTarget: null,
    physical: location,
    bytes: 0,
    approx: false,
    drive: driveOf(location),
    physicalDrive: '',
  }
  if (!(await exists(location))) return item
  item.exists = true
  let info
  try {
    info = await fs.lstat(location)
  } catch {
    return item
  }
  if (info.isSymbolicLink()) {
    item.managed = true
    item.linkTarget = await readLinkTarget(location)
    item.physical = (await realPath(location)) || cleanLink(item.linkTarget) || location
  }
  item.drive = driveOf(location) || item.drive
  item.physicalDrive = driveOf(item.physical)
  let isDirectory = info.isDirectory()
  if (!isDirectory && info.isSymbolicLink()) {
    try {
      isDirectory = (await fs.stat(location)).isDirectory()
    } catch {
      isDirectory = false
    }
  }
  if (!isDirectory) {
    item.bytes = info.size
    return item
  }
  const deadline = Date.now() + budget
  const size = await directorySize(location, { deadline })
  item.bytes = Number(size.bytes) || 0
  item.approx = Boolean(size.approx)
  return item
}

function cleanLink(value) {
  return String(value || '').replace(/^\\\\\?\\/, '')
}

async function driveUsage(directory) {
  try {
    const root = path.parse(String(directory || '')).root
    if (!root) return null
    const stats = await fs.statfs(root)
    return {
      drive: root.replace(/[\\/]+$/, ''),
      free: Number(stats.bavail) * Number(stats.bsize),
      total: Number(stats.blocks) * Number(stats.bsize),
    }
  } catch {
    return null
  }
}

/**
 * Inspect every known location. The home directory is a single category; its
 * main children are reported separately so the UI can show what is large.
 *
 * @param {{env?: Record<string,string|undefined>, budgetMs?: number}} options
 */
export async function auditData(options = {}) {
  const env = options.env || process.env
  const budgetMs = Number(options.budgetMs) > 0 ? Number(options.budgetMs) : CATEGORY_BUDGET_MS
  const locations = resolveDataLocations(env)
  const categories = await Promise.all(locations.map((location) => inspectLocation(location, { budgetMs })))
  const home = categories.find((entry) => entry.id === 'harness-home')
  const children = []
  if (home && home.exists) {
    let entries = []
    try {
      entries = await fs.readdir(home.path, { withFileTypes: true })
    } catch {
      entries = []
    }
    const wanted = new Set(HOME_CHILDREN)
    const childLocations = entries
      .filter((entry) => entry.isDirectory() && wanted.has(entry.name))
      .map((entry) => ({
        id: 'home-' + entry.name,
        label: entry.name,
        path: path.join(home.path, entry.name),
        targetName: entry.name,
        role: 'home-child',
        migrate: false,
      }))
    const inspected = await Promise.all(childLocations.map((location) => inspectLocation(location, {
      budgetMs: Math.min(CHILD_BUDGET_MS, budgetMs),
    })))
    children.push(...inspected)
  }
  const drives = new Map()
  for (const category of categories) {
    for (const candidate of [category.path, category.physical]) {
      const usage = await driveUsage(candidate)
      if (usage && usage.drive) drives.set(usage.drive, usage)
    }
  }
  if (home) {
    for (const candidate of [home.path, home.physical]) {
      const usage = await driveUsage(candidate)
      if (usage && usage.drive) drives.set(usage.drive, usage)
    }
  }
  const managedBytes = categories.filter((entry) => entry.managed).reduce((sum, entry) => sum + entry.bytes, 0)
  const unmanagedC = categories.filter((entry) => entry.exists && !entry.managed && driveOf(entry.path).toUpperCase() === 'C:')
  return {
    ok: true,
    generatedAt: Date.now(),
    home,
    categories,
    children,
    drives: Array.from(drives.values()),
    managedBytes,
    unmanagedBytes: unmanagedC.reduce((sum, entry) => sum + entry.bytes, 0),
    limits: { maxEntries: MAX_ENTRIES, budgetMs },
  }
}

/** Compact human-readable bytes used by both the API and tests. */
export function formatBytes(value) {
  const bytes = Math.max(0, Number(value) || 0)
  if (bytes < 1024) return bytes + ' B'
  const units = ['KB', 'MB', 'GB', 'TB']
  let amount = bytes
  let unit = 'B'
  for (const next of units) {
    amount /= 1024
    unit = next
    if (amount < 1024) break
  }
  return (amount >= 100 ? amount.toFixed(0) : amount >= 10 ? amount.toFixed(1) : amount.toFixed(2)) + ' ' + unit
}
