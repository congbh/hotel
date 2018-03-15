'use strict'

const {
  authenticate,
  createUser,
  deleteUser,
  forgotPassword,
  getUser,
  resetPassword,
  updateUser,
  verifyCredentials,
  verifyResetPasswordToken,
  verifyUniqueUser
} = require('../controllers/user')
const Joi = require('joi')
const SCHEMAS = require('../schemas/user')

async function register (server, options) {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: function (request, h) {
      return 'test passed'
    }
  })

  server.route({
    method: 'POST',
    path: '/users',
    handler: createUser,
    options: {
      pre: [
        { method: verifyUniqueUser, assign: 'user' }
      ],
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
      tags: ['api'],
      validate: {
        payload: SCHEMAS.CreateUserSchema
      },
      response: {
        schema: SCHEMAS.CreateUserResponseSchema
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/users/{guid}',
    handler: getUser,
    options: {
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
      tags: ['api'],
      validate: {
        params: SCHEMAS.GetUserSchema
      },
      response: {
        schema: SCHEMAS.GetUserResponseSchema
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/users/{guid}',
    handler: updateUser,
    options: {
      pre: [
        { method: getUser, assign: 'user' }
      ],
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
      tags: ['api'],
      validate: {
        params: SCHEMAS.UpdateUserSchema
      },
      response: {
        schema: SCHEMAS.UpdateUserResponseSchema
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/users/{guid}',
    handler: deleteUser,
    options: {
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
      tags: ['api'],
      validate: {
        params: SCHEMAS.DeleteUserSchema
      },
      response: {
        schema: SCHEMAS.DeleteUserResponseSchema
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/users/auth',
    handler: authenticate,
    options: {
      pre: [
        { method: verifyCredentials, assign: 'user' }
      ],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: Joi.object({
                token: Joi.string().required()
              }).label('Response')
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api'],
      validate: {
        payload: SCHEMAS.AuthUserSchema
      },
      response: {
        schema: Joi.object({
          token: Joi.string().required()
        }).label('Response')
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/users/forgot-password',
    handler: forgotPassword,
    options: {
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: Joi.object({
                result: Joi.number()
              }).label('Response')
            },
            '400': {
              description: 'Bad Request',
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().required()
        }
      },
      response: {
        schema: Joi.object({
          result: Joi.number()
        }).label('Response')
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/users/verify-reset-password-token',
    handler: verifyResetPasswordToken,
    options: {
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
      tags: ['api'],
      validate: {
        params: {
          token: Joi.string().required()
        }
      },
      response: {
        schema: SCHEMAS.VerifyResetPasswordTokenResponseSchema
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/users/reset-password',
    handler: resetPassword,
    options: {
      pre: [
        { method: verifyResetPasswordToken, assign: 'user' }
      ],
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
      tags: ['api'],
      validate: {
        payload: SCHEMAS.ResetPasswordSchema
      },
      response: {
        schema: SCHEMAS.ResetPasswordResponseSchema
      }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('../../package.json')
}
