'use strict'
const SCHEMAS = require('./schema')
const { inject } = require('../plugin/awilix-hapi')
const { API: { API_PATH } } = require('../config')

async function register (server, options) { // eslint-disable-line no-unused-vars
  server.route({
    method: 'POST',
    path: `${API_PATH}/users`,
    options: {
      auth: 'jwt',
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
      auth: 'jwt',
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
      auth: 'jwt',
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
      auth: 'jwt',
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
    method: 'GET',
    path: `${API_PATH}/users/me`,
    options: {
      auth: 'jwt',
      description: 'Get current user profile',
      pre: [inject('userController')],
      handler: async function (request, h) {
        const { pre: { userController } } = request
        let response = await userController.me(request, h)
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
      response: {
        schema: SCHEMAS.GetUserResponseSchema
      }
    }
  })

  server.route({
    method: 'PUT',
    path: `${API_PATH}/users/{id}`,
    options: {
      auth: 'jwt',
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
      auth: false,
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
      auth: 'jwt',
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
      auth: 'jwt',
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
      auth: 'jwt',
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
