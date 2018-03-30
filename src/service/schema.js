const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

const serviceResponse = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  catalog: Joi.object(),
  price: Joi.number(),
  other_price: Joi.number().allow(null),
  in_warehouse: Joi.bool(),
  in_invoice: Joi.bool(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

module.exports.CreateServiceSchema = Joi.object({
  name: Joi.string().required(),
  catalog: Joi.object().required(),
  price: Joi.number().required(),
  other_price: Joi.number().allow(null),
  in_warehouse: Joi.bool().default(false),
  in_invoice: Joi.bool().default(false)
})

module.exports.CreateServiceResponseSchema = serviceResponse.label('Response')

module.exports.DeleteServiceSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteServiceResponseSchema = Joi.bool().label('Response')

module.exports.GetServicesQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.ServicesResponseSchema = Joi.array().items(serviceResponse).label('Response')

module.exports.GetServiceSchema = Joi.object({
  id: Joi.string().guid().required()
})
module.exports.GetServiceResponseSchema = serviceResponse.label('Response')

module.exports.UpdateServiceParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateServiceResponseSchema = Joi.bool().label('Response')
