
const { API: { API_PATH } } = require('../config')
const SCHEMAS = require('./schema')
const { inject } = require('../plugin/awilix-hapi')

async function register (server, options) { // eslint-disable-line no-unused-vars
  server.route({
    method: 'POST',
    path: `${API_PATH}/services`,
    options: {
      pre: [inject('serviceController')],
      handler: async function (request, h) {
        const { pre: { serviceController } } = request
        let response = await serviceController.create(request, h)
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
              schema: SCHEMAS.CreateServiceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'services'],
      validate: {
        payload: SCHEMAS.CreateServiceSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateServiceResponseSchema
      },
      description: 'Create a new service'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/services/{id}`,
    options: {
      description: 'Delete service by id',
      pre: [inject('serviceController')],
      handler: async function (request, h) {
        const { pre: { serviceController } } = request
        let response = await serviceController.delete(request, h)
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
              schema: SCHEMAS.DeleteserviceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'services'],
      validate: {
        params: SCHEMAS.DeleteserviceSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteserviceResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/services`,
    options: {
      pre: [ inject('serviceController') ],
      handler: async function (request, h) {
        const { pre: { serviceController } } = request
        let response = await serviceController.list(request, h)
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
              schema: SCHEMAS.ServicesResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'services'],
      validate: {
        query: SCHEMAS.GetServicesQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.ServicesResponseSchema
      },
      description: 'Get all service'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/services/{id}`,
    options: {
      description: 'Get a service by id',
      pre: [inject('serviceController')],
      handler: async function (request, h) {
        const { pre: { serviceController } } = request
        let response = await serviceController.getOne(request, h)
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
              schema: SCHEMAS.GetServiceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'services'],
      validate: {
        params: SCHEMAS.GetServiceSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetServiceResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/services/{id}`,
    options: {
      description: 'Update service by id',
      pre: [
        inject('serviceController')
      ],
      handler: async function (request, h) {
        const { pre: { serviceController } } = request
        let response = await serviceController.update(request, h)
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
              schema: SCHEMAS.UpdateServiceResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'services'],
      validate: {
        params: SCHEMAS.UpdateServiceParamSchema,
        payload: SCHEMAS.CreateServiceSchema
      },
      response: {
        schema: SCHEMAS.UpdateServiceResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
