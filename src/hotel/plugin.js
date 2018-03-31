
const { API: { API_PATH } } = require('../config')
const SCHEMAS = require('./schema')
const { inject } = require('../plugin/awilix-hapi')

const pre1 = async function (request, h) {
  let result = await request.pre.hotelController.prepong(request, h)
  return result
}

async function register (server, options) { // eslint-disable-line no-unused-vars
  server.route({
    method: 'GET',
    path: `${API_PATH}/hotels/ping`,
    options: {
      pre: [
        inject('hotelController'),
        { method: pre1, assign: 'm3' }
      ],
      handler: async function (req, h) {
        // console.log(req.pre.m3)
        let result = await req.pre.hotelController.pong(req, h)
        return result
      }
    }
  })

  // create
  server.route({
    method: 'POST',
    path: `${API_PATH}/hotels`,
    options: {
      pre: [inject('hotelController')],
      handler: async function (req, h) {
        let response = await req.pre.hotelController.create(req, h)
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
              schema: SCHEMAS.CreateHotelResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'hotels'],
      validate: {
        payload: SCHEMAS.CreateHotelSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateHotelResponseSchema
      },
      description: 'Create new Hotel'
    }
  })

  // delete
  server.route({
    method: 'DELETE',
    path: `${API_PATH}/hotels/{id}`,
    options: {
      description: 'Delete Hotel by id',
      pre: [inject('hotelController')],
      handler: async function (request, h) {
        const { pre: { hotelController } } = request
        let response = await hotelController.delete(request, h)
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
              schema: SCHEMAS.DeleteHotelResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'hotels'],
      validate: {
        params: SCHEMAS.DeleteHotelSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteHotelResponseSchema
      }
    }
  })

  // list all
  server.route({
    method: 'GET',
    path: `${API_PATH}/hotels`,
    options: {
      pre: [ inject('hotelController') ],
      handler: async function (request, h) {
        const { pre: { hotelController } } = request
        let response = await hotelController.list(request, h)
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
              schema: SCHEMAS.HotelsResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'hotels'],
      validate: {
        query: SCHEMAS.GetHotelsQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.HotelsResponseSchema
      },
      description: 'Get all hotels'
    }
  })

  // get one
  server.route({
    method: 'GET',
    path: `${API_PATH}/hotels/{id}`,
    handler: async function (request, h) {
      const { pre: { hotelController } } = request
      let response = await hotelController.getOne(request, h)
      return response
    },
    options: {
      description: 'Get hotel by id',
      cors: {
        origin: 'ignore'
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: SCHEMAS.GetHotelResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      pre: [inject('hotelController')],
      tags: ['api', 'hotels'],
      validate: {
        params: SCHEMAS.GetHotelSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetHotelResponseSchema
      }
    }
  })

  // update
  server.route({
    method: 'PUT',
    path: `${API_PATH}/hotels/{id}`,
    options: {
      description: 'Update hotel by id',
      pre: [
        inject('hotelController')
      ],
      handler: async function (request, h) {
        const { pre: { hotelController } } = request
        let response = await hotelController.update(request, h)
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
              schema: SCHEMAS.UpdateHotelResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'hotels'],
      validate: {
        params: SCHEMAS.UpdateHotelParamSchema,
        payload: SCHEMAS.CreateHotelSchema
      },
      response: {
        schema: SCHEMAS.UpdateHotelResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
