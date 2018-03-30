'use strict'
const scopePerRequest = require('./scopePerRequest')
const inject = require('./inject')
const packageInfo = require('./package.json')
/**
 * hapi plugin registration function
 *
 * @param server Hapi.Server  The hapi server
 * @param options Object      Options necessary for the operation of awilix-hapi
 * @param next Function
 */
function registerPlugin (server, options) {
  server.decorate('request', 'container', scopePerRequest(options.container))
  if (options.register) {
    server.ext({ type: 'onRequest', method: options.register })
  }
  server.decorate('server', 'awilixInject', inject)
}
/**
 * hapi plugin registration object
 */
const awilixHapiPlugin = {
  register: registerPlugin,
  name: packageInfo.name,
  version: packageInfo.version
}

module.exports = awilixHapiPlugin
