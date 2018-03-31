
const { API: { API_PATH } } = require('../config')
const { inject } = require('../plugin/awilix-hapi')
const SCHEMAS = require('./schema')

async function register (server, options) { // eslint-disable-line no-unused-vars
  // create
  server.route({
    method: 'POST',
    path: `${API_PATH}/rooms`,
    options: {
      pre: [inject('roomController')],
      handler: async function (request, h) {
        const { pre: { roomController } } = request
        let response = await roomController.create(request, h)
        return response
      },
      cors: {
        origin: 'ignore'
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: SCHEMAS.CreateRoomResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'rooms'],
      validate: {
        payload: SCHEMAS.CreateRoomSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateRoomResponseSchema
      },
      description: 'Create new Room'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/rooms/{id}`,
    options: {
      description: 'Delete Room by id',
      pre: [inject('roomController')],
      handler: async function (request, h) {
        const { pre: { roomController } } = request
        let response = await roomController.delete(request, h)
        return response
      },
      cors: {
        origin: 'ignore'
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: SCHEMAS.DeleteRoomResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'rooms'],
      validate: {
        params: SCHEMAS.DeleteRoomSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteRoomResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/rooms`,
    options: {
      pre: [ inject('roomController') ],
      handler: async function (request, h) {
        const { pre: { roomController } } = request
        let response = await roomController.list(request, h)
        return response
      },
      cors: {
        origin: 'ignore'
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: SCHEMAS.RoomsResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'rooms'],
      validate: {
        query: SCHEMAS.GetRoomsQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.RoomsResponseSchema
      },
      description: 'Get all Room'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/rooms/{id}`,
    options: {
      description: 'Get Room by id',
      handler: async function (request, h) {
        const { pre: { roomController } } = request
        let response = await roomController.getOne(request, h)
        return response
      },
      cors: {
        origin: 'ignore'
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: SCHEMAS.GetRoomResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      pre: [inject('roomController')],
      tags: ['api', 'rooms'],
      validate: {
        params: SCHEMAS.GetRoomSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetRoomResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/rooms/{id}`,
    options: {
      description: 'Update room by id',
      pre: [
        inject('roomController')
      ],
      handler: async function (request, h) {
        const { pre: { roomController } } = request
        let response = await roomController.update(request, h)
        return response
      },
      cors: {
        origin: 'ignore'
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: SCHEMAS.UpdateRoomResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'rooms'],
      validate: {
        params: SCHEMAS.UpdateRoomParamSchema,
        payload: SCHEMAS.UpdateRoomPayloadSchema
      },
      response: {
        schema: SCHEMAS.UpdateRoomResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
