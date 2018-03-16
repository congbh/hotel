const Joi = require('joi')

module.exports = require('./generic')

module.exports.GetUsersQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().default(0)
})

module.exports.UsersResponseSchema = Joi.array().items({
  id: Joi.number(),
  guid: Joi.string().guid(),
  username: Joi.string(),
  email: Joi.string().email(),
  fullname: Joi.string().allow(null),
  address: Joi.string().allow(null),
  mobile: Joi.string().allow(null),
  created_at: Joi.date()
})

module.exports.DeleteUserSchema = Joi.object({
  guid: Joi.string().guid().required()
})

module.exports.DeleteUserResponseSchema = Joi.object({
  result: Joi.bool()
}).label('Response')

module.exports.UpdateUserParamSchema = Joi.object({
  guid: Joi.string().guid().required()
})

module.exports.UpdateUserPayloadSchema = Joi.object({
  address: Joi.string().allow(null),
  fullname: Joi.string().allow(null),
  mobile: Joi.string().allow(null)
})

module.exports.UpdateUserResponseSchema = Joi.object({
  result: Joi.bool()
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
  result: Joi.bool()
}).label('Response')

module.exports.ResetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  email: Joi.string().email().required()
})

module.exports.ResetPasswordResponseSchema = Joi.object({
  result: Joi.bool()
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
