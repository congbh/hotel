const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

module.exports.GetFloorsQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.FloorsResponseSchema = Joi.array().items({
  id: Joi.string().guid(),
  name: Joi.string(),
  hotel_id: Joi.string().guid(),
  created_by: Joi.string().guid(),
  line_number: Joi.number().integer(),
  activated: Joi.bool(),
  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null)
})

module.exports.CreateFloorSchema = Joi.object({
  name: Joi.string().required(),
  hotel_id: Joi.string().guid().required(),
  activated: Joi.bool().default(false),
  line_number: Joi.number().integer().default(1),
  created_by: Joi.string().guid().required()
})

module.exports.CreateFloorResponseSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  hotel_id: Joi.string().guid(),
  created_by: Joi.string(),
  activated: Joi.bool(),
  line_number: Joi.number().integer(),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).label('Response')

module.exports.GetFloorSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.GetFloorResponseSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  hotel_id: Joi.string().guid(),
  created_by: Joi.string(),
  activated: Joi.bool(),
  line_number: Joi.number().integer(),
  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null)
}).label('Response')

module.exports.UpdateFloorParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateFloorPayloadSchema = Joi.object({
  name: Joi.string().required(),
  line_number: Joi.number().integer()
})

module.exports.UpdateFloorResponseSchema = Joi.bool().label('Response')

module.exports.DeleteFloorSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteFloorResponseSchema = Joi.bool().label('Response')
