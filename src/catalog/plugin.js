
const SCHEMAS = require('./schema')
const { inject } = require('../plugin/awilix-hapi')
const { API: { API_PATH } } = require('../config')

async function register (server, options) { // eslint-disable-line no-unused-vars
  server.route({
    method: 'POST',
    path: `${API_PATH}/catalog`,
    options: {
      auth: 'jwt',
      pre: [inject('catalogController')],
      handler: async function (request, h) {
        const { pre: { catalogController } } = request
        let response = await catalogController.create(request, h)
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
              schema: SCHEMAS.CreateCatalogResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'catalog'],
      validate: {
        payload: SCHEMAS.CreateCatalogSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateCatalogResponseSchema
      },
      description: 'Create a new catalog'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/catalog/{id}`,
    options: {
      auth: 'jwt',
      description: 'Delete catalog by id',
      pre: [inject('catalogController')],
      handler: async function (request, h) {
        const { pre: { catalogController } } = request
        let response = await catalogController.delete(request, h)
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
              schema: SCHEMAS.DeleteCatalogResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'catalog'],
      validate: {
        params: SCHEMAS.DeleteCatalogSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteCatalogResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/catalog`,
    options: {
      auth: 'jwt',
      pre: [ inject('catalogController') ],
      handler: async function (request, h) {
        const { pre: { catalogController } } = request
        let response = await catalogController.list(request, h)
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
              schema: SCHEMAS.ListCatalogResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'catalogs'],
      validate: {
        query: SCHEMAS.GetListCatalogQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.ListCatalogResponseSchema
      },
      description: 'Get all catalog'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/catalog/{id}`,
    options: {
      auth: 'jwt',
      description: 'Get a catalog by id',
      pre: [inject('catalogController')],
      handler: async function (request, h) {
        const { pre: { catalogController } } = request
        let response = await catalogController.getOne(request, h)
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
              schema: SCHEMAS.GetCatalogResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'catalog'],
      validate: {
        params: SCHEMAS.GetCatalogSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetCatalogResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/catalog/{id}`,
    options: {
      auth: 'jwt',
      description: 'Update catalog by id',
      pre: [
        inject('catalogController')
      ],
      handler: async function (request, h) {
        const { pre: { catalogController } } = request
        let response = await catalogController.update(request, h)
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
              schema: SCHEMAS.UpdateCatalogResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'catalog'],
      validate: {
        params: SCHEMAS.UpdateCatalogParamSchema,
        payload: SCHEMAS.CreateCatalogSchema
      },
      response: {
        schema: SCHEMAS.UpdateCatalogResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
