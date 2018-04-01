
const { API: { API_PATH } } = require('../config')
const { inject } = require('../plugin/awilix-hapi')
const SCHEMAS = require('./schema')

async function register (server, options) { // eslint-disable-line no-unused-vars
  // create
  server.route({
    method: 'POST',
    path: `${API_PATH}/prices`,
    options: {
      auth: 'jwt',
      pre: [inject('priceController')],
      handler: async function (request, h) {
        const { pre: { priceController } } = request
        let response = await priceController.create(request, h)
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
              schema: SCHEMAS.CreatePriceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'prices'],
      validate: {
        payload: SCHEMAS.CreatePriceSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreatePriceResponseSchema
      },
      description: 'Create new price'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/prices/{id}`,
    options: {
      auth: 'jwt',
      description: 'Delete Room by id',
      pre: [inject('priceController')],
      handler: async function (request, h) {
        const { pre: { priceController } } = request
        let response = await priceController.delete(request, h)
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
              schema: SCHEMAS.DeletePriceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'prices'],
      validate: {
        params: SCHEMAS.DeletePriceSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeletePriceResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/prices`,
    options: {
      auth: 'jwt',
      pre: [ inject('priceController') ],
      handler: async function (request, h) {
        const { pre: { priceController } } = request
        let response = await priceController.list(request, h)
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
              schema: SCHEMAS.ListPriceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'prices'],
      validate: {
        query: SCHEMAS.GetListPriceQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.ListPriceResponseSchema
      },
      description: 'Get all Room'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/prices/{id}`,
    options: {
      auth: 'jwt',
      description: 'Get Room by id',
      handler: async function (request, h) {
        const { pre: { priceController } } = request
        let response = await priceController.get(request, h)
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
              schema: SCHEMAS.GetPriceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      pre: [inject('priceController')],
      tags: ['api', 'prices'],
      validate: {
        params: SCHEMAS.GetPriceSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetPriceResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/prices/{id}`,
    options: {
      auth: 'jwt',
      description: 'Update room by id',
      pre: [
        inject('priceController')
      ],
      handler: async function (request, h) {
        const { pre: { priceController } } = request
        let response = await priceController.update(request, h)
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
              schema: SCHEMAS.UpdatePriceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'prices'],
      validate: {
        params: SCHEMAS.UpdatePriceParamSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.UpdatePriceResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
