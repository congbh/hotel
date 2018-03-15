'use strict'

const Joi = require('joi')
const SCHEMAS = require('../schemas')
const { authenticate, create, forgotPassword } = require('../controllers/user')

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
    handler: create
    // options: {
    //   plugins: {
    //     'hapi-swagger': {
    //       responses: {
    //         '200': {
    //           description: 'Success',
    //           schema: Joi.object({
    //             result: SCHEMAS.User
    //           }).label('Response')
    //         },
    //         '400': {
    //           description: 'Bad Request',
    //           schema: SCHEMAS.Error
    //         }
    //       },
    //       security: {}
    //     }
    //   },
    //   tags: ['api'],
    //   validate: {
    //     payload: {
    //       username: Joi.string().required(),
    //       email: Joi.string().required(),
    //       password: Joi.string().required()
    //     }
    //   },
    //   response: {
    //     schema: Joi.object({
    //       result: SCHEMAS.User
    //     }).label('Response')
    //   }
    // }
  })

  server.route({
    method: 'POST',
    path: '/users/authenticate',
    handler: authenticate,
    options: {
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Success',
              schema: Joi.object(SCHEMAS.User).label('Response')
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
        payload: Joi.alternatives().try(
          Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
          }),
          Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
          })
        )
      },
      response: {
        schema: Joi.object(SCHEMAS.User).label('Response')
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/users/forgot-password',
    handler: forgotPassword,
    options: {
      // plugins: {
      //   'hapi-swagger': {
      //     responses: {
      //       '200': {
      //         description: 'Success',
      //         schema: Joi.object({
      //           result: SCHEMAS.User
      //         }).label('Response')
      //       },
      //       '400': {
      //         description: 'Bad Request',
      //         schema: SCHEMAS.Error
      //       }
      //     },
      //     security: {}
      //   }
      // },
      // tags: ['api'],
      validate: {
        payload: {
          email: Joi.string().required()
        }
      },
      // response: {
      //   schema: Joi.object({
      //     result: SCHEMAS.User
      //   }).label('Response')
      // }
    }
  })
}

exports.plugin = {
  register,
  pkg: require('../../package.json')
}
