const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

module.exports.GetHotelsQuerySchema = Joi.object({
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.HotelsResponseSchema = Joi.array().items({
  id: Joi.string().guid(),
  name: Joi.string(),
  floor: Joi.number().integer(),
  room: Joi.number().integer(),
  address: Joi.string(),
  province: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  created_by: Joi.string().guid(),
  activated: Joi.bool(),
  note: Joi.string().allow(null),
  website: Joi.string().allow(null),
  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null)
})

module.exports.CreateHotelSchema = Joi.object({
  name: Joi.string().required(),
  floor: Joi.number().integer().required(),
  room: Joi.number().integer().required(),
  created_by: Joi.string().guid().required(),
  address: Joi.string().required(),
  province: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  note: Joi.required().allow(null),
  website: Joi.required().allow(null),
  activated: Joi.bool().default(false)
})

module.exports.CreateHotelResponseSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  floor: Joi.number().integer(),
  room: Joi.number().integer(),
  address: Joi.string(),
  province: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  note: Joi.string().allow(null),
  website: Joi.string().allow(null),
  created_by: Joi.string(),
  activated: Joi.bool()
}).label('Response')

module.exports.GetHotelSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.GetHotelResponseSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  floor: Joi.number().integer(),
  room: Joi.number().integer(),
  address: Joi.string(),
  province: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  created_by: Joi.string().guid(),
  activated: Joi.bool(),
  note: Joi.string().allow(null),
  website: Joi.string().allow(null),
  created_at: Joi.date().allow(null),
  updated_at: Joi.date().allow(null)
}).label('Response')

module.exports.UpdateHotelParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateHotelResponseSchema = Joi.bool().label('Response')

module.exports.DeleteHotelSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteHotelResponseSchema = Joi.bool().label('Response')
