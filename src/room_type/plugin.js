
const { API: { API_PATH } } = require('../config')
const { inject } = require('../plugin/awilix-hapi')
const SCHEMAS = require('./schema')

async function register (server, options) {
  // create
  server.route({
    method: 'POST',
    path: `${API_PATH}/room_types`,
    options: {
      pre: [inject('roomTypeController')],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.create(request, h)
        return response
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
        payload: SCHEMAS.CreateRoomTypeSchema
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
      description: 'Delete Room by id',
      pre: [inject('roomTypeController')],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.delete(request, h)
        return response
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
        params: SCHEMAS.DeleteRoomTypeSchema
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
      pre: [ inject('roomTypeController') ],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.list(request, h)
        return response
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
        query: SCHEMAS.GetListRoomTypeQuerySchema
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
      description: 'Get Room by id',
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.get(request, h)
        return response
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
        params: SCHEMAS.GetRoomTypeSchema
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
      description: 'Update room by id',
      pre: [
        inject('roomTypeController')
      ],
      handler: async function (request, h) {
        const { pre: { roomTypeController } } = request
        let response = await roomTypeController.update(request, h)
        return response
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
