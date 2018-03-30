const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

const catalogResponse = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  note: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

module.exports.CreateCatalogSchema = Joi.object({
  name: Joi.string().required(),
  note: Joi.string().allow(null)
})

module.exports.CreateCatalogResponseSchema = catalogResponse.label('Response')

module.exports.DeleteCatalogSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteCatalogResponseSchema = Joi.bool().label('Response')

module.exports.GetListCatalogQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.ListCatalogResponseSchema = Joi.array().items(catalogResponse).label('Response')

module.exports.GetCatalogSchema = Joi.object({
  id: Joi.string().guid().required()
})
module.exports.GetCatalogResponseSchema = catalogResponse.label('Response')

module.exports.UpdateCatalogParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateCatalogResponseSchema = Joi.bool().label('Response')
