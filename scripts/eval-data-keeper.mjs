#!/usr/bin/env node
/**
 * Data Keeper route contract evaluation.
 *
 * Exercises the Host-side audit and migration-plan endpoints with a real
 * filesystem audit and a fake web carrier. It is read-only: the plan endpoint
 * only builds a PowerShell string and the test asserts the target root was not
 * created.
 *
 * Usage: node scripts/eval-data-keeper.mjs
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { Readable } from 'node:stream'
import { apply } from '../index.js'

const routes = []
const child = {
  webServer: {
    register(route) {
      routes.push(route)
      return () => {}
    },
  },
  effect(fn) { return fn() },
  logger: { warn() {} },
}
apply({
  inject(_names, callback) {
    callback(child)
  },
})

const dataRoute = routes.find((route) => route.path === '/dsh-claude-mode/data')
assert.ok(dataRoute, 'data route was not registered')
assert.equal(dataRoute.kind, 'prefix')

function callRoute(pathname, body, headers = {}, method = 'GET') {
  const request = Readable.from(body ? [Buffer.from(body)] : [])
  request.method = method
  request.url = pathname
  request.headers = Object.assign({ 'x-dsh-claude-mode': '1' }, headers)
  request.destroy = () => {}
  const response = {
    status: 0,
    headers: null,
    body: '',
    writeHead(status, responseHeaders) {
      this.status = status
      this.headers = responseHeaders
    },
    end(value) { this.body = String(value == null ? '' : value) },
  }
  return Promise.resolve(dataRoute.handler(request, response)).then(() => response)
}

const noGate = await callRoute('/dsh-claude-mode/data/audit', '', { 'x-dsh-claude-mode': '' })
assert.equal(noGate.status, 403)

const auditResponse = await callRoute('/dsh-claude-mode/data/audit', '', {}, 'GET')
assert.equal(auditResponse.status, 200)
const audit = JSON.parse(auditResponse.body)
assert.equal(audit.ok, true)
assert.equal(audit.home.id, 'harness-home')
assert.ok(Array.isArray(audit.categories))
assert.ok(audit.categories.some((entry) => entry.id === 'harness-home'))
assert.ok(Array.isArray(audit.drives))
assert.ok(typeof audit.managedLabel === 'string')
assert.ok(typeof audit.unmanagedLabel === 'string')
assert.ok(audit.categories.every((entry) => typeof entry.bytesLabel === 'string'))

const wrongMethod = await callRoute('/dsh-claude-mode/data/plan', '', {}, 'GET')
assert.equal(wrongMethod.status, 405)

const targetRoot = path.join(os.tmpdir(), 'dsh-data-plan-eval-' + process.pid + '-' + Date.now())
const planResponse = await callRoute('/dsh-claude-mode/data/plan', JSON.stringify({ targetRoot }), {
  'content-type': 'application/json',
}, 'POST')
assert.equal(planResponse.status, 200)
const plan = JSON.parse(planResponse.body)
assert.equal(plan.ok, true)
assert.equal(plan.targetRoot, path.resolve(targetRoot))
assert.ok(Array.isArray(plan.actions))
assert.ok(Array.isArray(plan.instructions))
assert.match(plan.script, /robocopy/)
assert.match(plan.script, /New-Item -ItemType Junction/)
assert.match(plan.script, /DeepSeek Harness/)
assert.equal(fs.existsSync(targetRoot), false, 'plan endpoint must not create the target root')

const badRoot = await callRoute('/dsh-claude-mode/data/plan', JSON.stringify({ targetRoot: 'relative\\data' }), {
  'content-type': 'application/json',
}, 'POST')
assert.equal(badRoot.status, 400)

const badJson = await callRoute('/dsh-claude-mode/data/plan', '{bad', {
  'content-type': 'application/json',
}, 'POST')
assert.equal(badJson.status, 400)

const cleanupResponse = await callRoute('/dsh-claude-mode/data/cleanup', JSON.stringify({ olderThanDays: 7 }), {
  'content-type': 'application/json',
}, 'POST')
assert.equal(cleanupResponse.status, 200)
const cleanup = JSON.parse(cleanupResponse.body)
assert.equal(cleanup.ok, true)
assert.equal(cleanup.olderThanDays, 7)
assert.ok(cleanup.scopes.every((scope) => scope.id === 'temp' || scope.id === 'system-temp'))
assert.match(cleanup.script, /\[switch\]\$Apply/)
assert.match(cleanup.script, /dsh\[-_\]/)
assert.equal(cleanup.script.includes('harness-home'), false)

const badDays = await callRoute('/dsh-claude-mode/data/cleanup', JSON.stringify({ olderThanDays: 0 }), {
  'content-type': 'application/json',
}, 'POST')
assert.equal(badDays.status, 400)

console.log(JSON.stringify({
  ok: true,
  route: dataRoute.path,
  categories: audit.categories.map((entry) => entry.id),
  drives: audit.drives.map((entry) => entry.drive),
  unmanaged: audit.unmanagedLabel,
  planActions: plan.actions.map((entry) => entry.id),
  planBytes: plan.script.length,
  cleanupScopes: cleanup.scopes.map((entry) => entry.id),
}, null, 2))
