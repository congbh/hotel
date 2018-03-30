const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

const userResponse = Joi.object({
  id: Joi.string().guid(),
  username: Joi.string(),
  email: Joi.string().email(),
  fullname: Joi.string().allow(null),
  address: Joi.string().allow(null),
  mobile: Joi.string().allow(null),
  activated: Joi.bool(),
  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null)
})

module.exports.GetUsersQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.UsersResponseSchema = Joi.array().items(userResponse).label('Response')

module.exports.DeleteUserSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteUserResponseSchema = Joi.object({
  result: Joi.bool()
}).label('Response')

module.exports.UpdateUserParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateUserPayloadSchema = Joi.object({
  address: Joi.string().allow(null),
  fullname: Joi.string().allow(null),
  mobile: Joi.string().allow(null)
})

module.exports.UpdateUserResponseSchema = Joi.bool().label('Response')

module.exports.GetUserSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.GetUserResponseSchema = userResponse.label('Response')

module.exports.CreateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

module.exports.CreateUserResponseSchema = userResponse.label('Response')

module.exports.ResetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required()
})

module.exports.ResetPasswordResponseSchema = Joi.bool().label('Response')

module.exports.VerifyResetPasswordTokenSchema = Joi.object({
  token: Joi.string().required()
})

module.exports.VerifyResetPasswordTokenResponseSchema = Joi.object({
  email: Joi.string().email(),
  id: Joi.string().guid(),
  username: Joi.string()
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

module.exports.AuthUserResponseSchema = Joi.object({
  token: Joi.string().required()
}).label('Response')

module.exports.ForgotPasswordSchema = Joi.object({
  email: Joi.string().required()
})
module.exports.ForgotPasswordResponseSchema = Joi.bool().label('Response')
