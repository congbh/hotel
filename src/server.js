'use strict'

const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')
const Hoek = require('hoek')
const Pack = require('../package.json')

const userPlugin = require('./plugin/user')

const server = Hapi.server({
  host: process.env.API_HOST,
  port: process.env.API_PORT
})

const init = async () => {
  const HapiSwaggerConfig = {
    plugin: HapiSwagger,
    options: {
      info: {
        title: Pack.name,
        description: Pack.description,
        version: Pack.version
      },
      swaggerUI: true,
      basePath: '/api/v1',
      pathPrefixSize: 2,
      jsonEditor: true,
      // jsonPath: '/docs/swagger.json',
      sortPaths: 'path-method',
      lang: 'en',
      tags: [
        { name: 'api' }
      ],
      documentationPath: '/docs',
      securityDefinitions: {}
    }
  }

  await server.register([
    userPlugin,
    Vision,
    Inert,
    HapiSwaggerConfig
  ])

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  Hoek.assert(!err, err)
  process.exit(1)
})

init()

module.exports = server
