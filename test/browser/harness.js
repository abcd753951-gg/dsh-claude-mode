/* Harness bootstrap: the module-loader surface the Host provides, plus a capture
   of any warning the plugin logs while it applies. Runs before client.js. */
;(function () {
  'use strict'
  var tests = { entry: undefined, logs: [] }
  window.__CCM_TESTS__ = tests

  window.__ModuleLoader__ = {
    load: function (entry) {
      tests.entry = entry
    },
  }

  ;['warn', 'error'].forEach(function (level) {
    var original = console[level].bind(console)
    console[level] = function () {
      tests.logs.push([level, Array.prototype.map.call(arguments, String).join(' ')])
      original.apply(console, arguments)
    }
  })
})()
