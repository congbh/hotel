'use strict'
const SCHEMAS = require('./schema')
const { inject } = require('../plugin/awilix-hapi')
const { API: { API_PATH } } = require('../config')

async function register (server, options) { // eslint-disable-line no-unused-vars
  server.route({
    method: 'GET',
    path: '/users/ping',
    config: {
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.ping(request, h)
        return response
      }
    }
  })

  server.route({
    method: 'POST',
    path: `${API_PATH}/users`,
    options: {
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.create(request, h)
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
              schema: SCHEMAS.CreateUserResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        payload: SCHEMAS.CreateUserSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.CreateUserResponseSchema
      },
      description: 'Create new user'
    }
  })

  server.route({
    method: 'DELETE',
    path: `${API_PATH}/users/{id}`,
    options: {
      description: 'Delete user by id',
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.delete(request, h)
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
              schema: SCHEMAS.DeleteUserResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        params: SCHEMAS.DeleteUserSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.DeleteUserResponseSchema
      }
    }
  })

  server.route({
    method: 'GET',
    path: `${API_PATH}/users`,
    options: {
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.list(request, h)
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
              schema: SCHEMAS.UsersResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        query: SCHEMAS.GetUsersQuerySchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.UsersResponseSchema
      },
      description: 'Get all users'
    }
  })

  server.route({
    method: 'GET',
    path: `${API_PATH}/users/{id}`,
    options: {
      description: 'Get user by id',
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.getOne(request, h)
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
              schema: SCHEMAS.GetUserResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        params: SCHEMAS.GetUserSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.GetUserResponseSchema
      }
    }
  })

  server.route({
    method: 'PUT',
    path: `${API_PATH}/users/{id}`,
    options: {
      description: 'Update user by id',
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.update(request, h)
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
              schema: SCHEMAS.UpdateUserResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        params: SCHEMAS.UpdateUserParamSchema,
        payload: SCHEMAS.UpdateUserPayloadSchema
      },
      response: {
        schema: SCHEMAS.UpdateUserResponseSchema
      }
    }
  })

  server.route({
    method: 'POST',
    path: `${API_PATH}/users/auth`,
    options: {
      description: 'Authentication user',
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.authenticate(request, h)
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
              schema: SCHEMAS.AuthUserResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        payload: SCHEMAS.AuthUserSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.AuthUserResponseSchema
      }
    }
  })

  server.route({
    method: 'POST',
    path: `${API_PATH}/users/forgot-password`,
    options: {
      description: 'Fotgot password',
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.forgotPassword(request, h)
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
              schema: SCHEMAS.ForgotPasswordResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        payload: SCHEMAS.ForgotPasswordSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.ForgotPasswordResponseSchema
      }
    }
  })

  server.route({
    method: 'GET',
    path: `${API_PATH}/users/verify-reset-password/{token}`,
    options: {
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.verifyResetPasswordToken(request, h)
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
              schema: SCHEMAS.VerifyResetPasswordTokenResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        params: SCHEMAS.VerifyResetPasswordTokenSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.VerifyResetPasswordTokenResponseSchema
      }
    }
  })

  server.route({
    method: 'POST',
    path: `${API_PATH}/users/reset-password`,
    options: {
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.resetPassword(request, h)
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
              schema: SCHEMAS.ResetPasswordResponseSchema
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api', 'users'],
      validate: {
        payload: SCHEMAS.ResetPasswordSchema,
        failAction: (request, h, error) => {
          return h
            .response({ message: error.details[0].message.replace(/['"]+/g, '') })
            .code(400)
            .takeover()
        }
      },
      response: {
        schema: SCHEMAS.ResetPasswordResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('./package.json')
}
