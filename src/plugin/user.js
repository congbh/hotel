'use strict'

const {
  authenticate,
  createUser,
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
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
    method: 'GET',
    path: '/users',
    handler: getUsers,
    options: {
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.UsersResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api'],
      validate: {
        query: SCHEMAS.GetUsersQuerySchema
      },
      response: {
        schema: SCHEMAS.UsersResponseSchema
      },
      description: 'Get all users'
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
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.CreateUserResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
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
      },
      description: 'Create new user'
    }
  })

  server.route({
    method: 'GET',
    path: '/users/{guid}',
    handler: getUser,
    options: {
      description: 'Get user by uid',
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.GetUserResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
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
      description: 'Update user by uid',
      pre: [
        { method: getUser, assign: 'user' }
      ],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.UpdateUserResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api'],
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
    method: 'DELETE',
    path: '/users/{guid}',
    handler: deleteUser,
    options: {
      description: 'Delete user by uid',
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.DeleteUserResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
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
      description: 'Authentication user',
      pre: [
        { method: verifyCredentials, assign: 'user' }
      ],
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: Joi.object({
                token: Joi.string().required()
              }).label('Response')
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
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
      description: 'Fotgot password',
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: Joi.object({
                result: Joi.bool()
              }).label('Response')
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
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
          result: Joi.bool()
        }).label('Response')
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/users/verify-reset-password-token/{token}',
    handler: verifyResetPasswordToken,
    options: {
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.VerifyResetPasswordTokenResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
              schema: SCHEMAS.Error
            }
          },
          security: {}
        }
      },
      tags: ['api'],
      validate: {
        params: {
          token: Joi.string()
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
              description: SCHEMAS.Messages.Success,
              schema: SCHEMAS.ResetPasswordResponseSchema
            },
            '400': {
              description: SCHEMAS.Messages.BadRequest,
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
