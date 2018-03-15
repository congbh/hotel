const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
})
.label('Error')

module.exports.User = {
  id: Joi.number(),
  username: Joi.string(),
  password: Joi.string(),
  email: Joi.string().email(),
  created_at: Joi.date(),
  resetPasswordToken: Joi.string().allow(null),
  resetPasswordExpires: Joi.number().allow(null)
}
