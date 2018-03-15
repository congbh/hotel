'use strict'
const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

module.exports.User = {
  id: Joi.number(),
  guid: Joi.string().guid(),
  username: Joi.string(),
  password: Joi.string(),
  email: Joi.string().email(),
  lastname: Joi.string(),
  firstname: Joi.string(),
  address: Joi.string(),
  mobile: Joi.string(),
  created_at: Joi.date(),
  resetPasswordToken: Joi.string().allow(null),
  resetPasswordExpires: Joi.number().allow(null)
}

module.exports.DeleteUserSchema = Joi.object({
  guid: Joi.string().guid().required()
})

module.exports.DeleteUserResponseSchema = Joi.object({
  result: Joi.number()
}).label('Response')

module.exports.UpdateUserSchema = Joi.object({
  guid: Joi.string().guid().required()
})

module.exports.UpdateUserResponseSchema = Joi.object({
  result: Joi.number()
}).label('Response')

module.exports.GetUserSchema = Joi.object({
  guid: Joi.string().guid().required()
})

module.exports.GetUserResponseSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  guid: Joi.string().guid().required(),
  username: Joi.string().required()
}).label('Response')

module.exports.CreateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

module.exports.CreateUserResponseSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  guid: Joi.string().guid().required(),
  username: Joi.string().required()
}).label('Response')

module.exports.ResetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  email: Joi.string().email().required()
})

module.exports.ResetPasswordResponseSchema = Joi.object({
  token: Joi.string().required(),
  email: Joi.string().email().required()
}).label('Response')

module.exports.VerifyResetPasswordTokenResponseSchema = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().email().required(),
  guid: Joi.string().guid().required(),
  username: Joi.string().required()
}).label('Response')

module.exports.AuthUserSchema = Joi.alternatives().try(
    Joi.object({
      username: Joi.string().alphanum().min(2).max(30).required(),
      password: Joi.string().required()
    }),
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
)
