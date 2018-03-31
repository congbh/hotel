
const { API: { API_PATH } } = require('../config')
const { inject } = require('../plugin/awilix-hapi')
const SCHEMAS = require('./schema')

async function register (server, options) { // eslint-disable-line no-unused-vars
  // create
  server.route({
    method: 'POST',
    path: `${API_PATH}/floors`,
    options: {
      pre: [inject('floorController')],
      handler: async function (request, h) {
        const { pre: { floorController } } = request
        let response = await floorController.create(request, h)
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
              schema: SCHEMAS.CreateFloorResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'floors'],
      validate: {
        payload: SCHEMAS.CreateFloorSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateFloorResponseSchema
      },
      description: 'Create new floor'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/floors/{id}`,
    options: {
      description: 'Delete floor by id',
      pre: [inject('floorController')],
      handler: async function (request, h) {
        const { pre: { floorController } } = request
        let response = await floorController.delete(request, h)
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
              schema: SCHEMAS.DeleteFloorResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'floors'],
      validate: {
        params: SCHEMAS.DeleteFloorSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteFloorResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/floors`,
    options: {
      pre: [ inject('floorController') ],
      handler: async function (request, h) {
        const { pre: { floorController } } = request
        let response = await floorController.list(request, h)
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
              schema: SCHEMAS.FloorsResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'floors'],
      validate: {
        query: SCHEMAS.GetFloorsQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.FloorsResponseSchema
      },
      description: 'Get all floor'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/floors/{id}`,
    options: {
      description: 'Get floor by id',
      handler: async function (request, h) {
        const { pre: { floorController } } = request
        let response = await floorController.getOne(request, h)
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
              schema: SCHEMAS.GetFloorResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      pre: [inject('floorController')],
      tags: ['api', 'floors'],
      validate: {
        params: SCHEMAS.GetFloorSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetFloorResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/floors/{id}`,
    options: {
      description: 'Update hotel by id',
      pre: [
        inject('floorController')
      ],
      handler: async function (request, h) {
        const { pre: { floorController } } = request
        let response = await floorController.update(request, h)
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
              schema: SCHEMAS.UpdateFloorResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'floors'],
      validate: {
        params: SCHEMAS.UpdateFloorParamSchema,
        payload: SCHEMAS.UpdateFloorPayloadSchema
      },
      response: {
        schema: SCHEMAS.UpdateFloorResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
