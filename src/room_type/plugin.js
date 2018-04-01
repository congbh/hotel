
const { API: { API_PATH } } = require('../config')
const { inject } = require('../plugin/awilix-hapi')
const SCHEMAS = require('./schema')

async function register (server, options) { // eslint-disable-line no-unused-vars
  // create
  server.route({
    method: 'POST',
    path: `${API_PATH}/room_types`,
    options: {
      auth: 'jwt',
      pre: [inject('roomTypeController')],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.create(request, h)
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
              schema: SCHEMAS.CreateRoomTypeResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'room_types'],
      validate: {
        payload: SCHEMAS.CreateRoomTypeSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateRoomTypeResponseSchema
      },
      description: 'Create new Room'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/room_types/{id}`,
    options: {
      auth: 'jwt',
      description: 'Delete Room by id',
      pre: [inject('roomTypeController')],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.delete(request, h)
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
              schema: SCHEMAS.DeleteRoomTypeResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'room_types'],
      validate: {
        params: SCHEMAS.DeleteRoomTypeSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteRoomTypeResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/room_types`,
    options: {
      auth: 'jwt',
      pre: [ inject('roomTypeController') ],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.list(request, h)
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
              schema: SCHEMAS.ListRoomTypeResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'room_types'],
      validate: {
        query: SCHEMAS.GetListRoomTypeQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.ListRoomTypeResponseSchema
      },
      description: 'Get all Room'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/room_types/{id}`,
    options: {
      auth: 'jwt',
      description: 'Get Room by id',
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.get(request, h)
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
              schema: SCHEMAS.GetRoomTypeResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      pre: [inject('roomTypeController')],
      tags: ['api', 'room_types'],
      validate: {
        params: SCHEMAS.GetRoomTypeSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetRoomTypeResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/room_types/{id}`,
    options: {
      auth: 'jwt',
      description: 'Update room by id',
      pre: [
        inject('roomTypeController')
      ],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.update(request, h)
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
              schema: SCHEMAS.UpdateRoomTypeResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'room_types'],
      validate: {
        params: SCHEMAS.UpdateRoomTypeParamSchema,
        payload: SCHEMAS.UpdateRoomTypePayloadSchema
      },
      response: {
        schema: SCHEMAS.UpdateRoomTypeResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
