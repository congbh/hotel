'use strict'

const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')
const Pack = require('../package.json')

const awilix = require('awilix')
const { awilixHapiPlugin } = require('./plugin/awilix-hapi')
const connection = require('./db/connection')

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

const { UserPlugin, UserController, UserService, UserRepository } = require('./users')
const { HotelPlugin, HotelController, HotelService, HotelRepository } = require('./hotel')
const { FloorPlugin, FloorController, FloorService, FloorRepository } = require('./floor')
const { RoomPlugin, RoomController, RoomService, RoomRepository } = require('./room')
const { RoomTypePlugin, RoomTypeController, RoomTypeService, RoomTypeRepository } = require('./room_type')
const { ServicePlugin, ServiceController, ServiceSrv, ServiceRepository } = require('./service')
const { CatalogPlugin, CatalogController, CatalogService, CatalogRepository } = require('./catalog')
const { PricePlugin, PriceController, PriceService, PriceRepository } = require('./price')

container.register({
  connection: awilix.asValue(connection)
})
.register({
  userController: awilix.asClass(UserController),
  userService: awilix.asClass(UserService),
  userRepository: awilix.asFunction(UserRepository)
})
.register({
  hotelController: awilix.asClass(HotelController),
  hotelService: awilix.asClass(HotelService),
  hotelRepository: awilix.asFunction(HotelRepository),

  floorController: awilix.asClass(FloorController),
  floorService: awilix.asClass(FloorService),
  floorRepository: awilix.asFunction(FloorRepository),

  roomController: awilix.asClass(RoomController),
  roomService: awilix.asClass(RoomService),
  roomRepository: awilix.asFunction(RoomRepository),

  roomTypeController: awilix.asClass(RoomTypeController),
  roomTypeService: awilix.asClass(RoomTypeService),
  roomTypeRepository: awilix.asFunction(RoomTypeRepository)
})
.register({
  serviceController: awilix.asClass(ServiceController),
  serviceSrv: awilix.asClass(ServiceSrv),
  serviceRepository: awilix.asFunction(ServiceRepository)
})
.register({
  catalogController: awilix.asClass(CatalogController),
  catalogService: awilix.asClass(CatalogService),
  catalogRepository: awilix.asFunction(CatalogRepository)
})
.register({
  priceController: awilix.asClass(PriceController),
  priceService: awilix.asClass(PriceService),
  priceRepository: awilix.asFunction(PriceRepository)
})

const server = Hapi.server({
  port: process.env.PORT || 8080
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

  const awilixPlugin = {
    plugin: awilixHapiPlugin,
    options: {
      container,
      register: function (request, h) {
        // request.container.register({
        //   user: 12
        // })

        return h.continue
      }
    }
  }

  const HapiGoodConfig = {
    plugin: require('good'),
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        }, {
          module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ error: '*', response: '*', log: '*', request: '*' }]
        }, {
          module: 'good-squeeze',
          name: 'SafeJson'
        }, {
          module: 'good-file',
          args: ['./logs/log']
        }],
        myHTTPReporter: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ error: '*' }]
        }, {
          module: 'good-http',
          args: ['http://localhost:8000/logs', {
            wreck: {
              headers: { 'x-api-key': 12345 }
            }
          }]
        }]
      }
    }
  }

  await server.register([
    Vision,
    Inert,
    HapiSwaggerConfig,
    HapiGoodConfig,
    awilixPlugin,

    UserPlugin,
    HotelPlugin,
    FloorPlugin,
    RoomPlugin,
    RoomTypePlugin,

    ServicePlugin,
    CatalogPlugin,
    PricePlugin
  ])

  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  if (err) {
    process.exit(1)
  }
})

init()

module.exports.Server = server
module.exports.Container = container
