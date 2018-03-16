const Joi = require('joi')

module.exports.Messages = {
  Success: 'Success',
  BadRequest: 'Bad Request'
}

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')
