const Joi = require('joi')

const priceResponse = Joi.object({
  id: Joi.string().guid(),
  room_type_id: Joi.string().guid(),
  name: Joi.string(),
  applied_time: Joi.object(),
  day: Joi.number(),
  night: Joi.number(),
  week: Joi.number(),
  month: Joi.number(),
  hours: Joi.object(),
  ex_hours_checkout: Joi.object(),
  ex_hours_night_checkout: Joi.object(),
  ex_hours_checkin: Joi.object(),
  ex_hours_night_checkin: Joi.object(),
  ex_bed: Joi.number(),
  note: Joi.string(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

module.exports.CreatePriceSchema = Joi.object({
  name: Joi.string().required(),
  room_type_id: Joi.string().guid().required(),
  applied_time: Joi.object().allow(null),
  day: Joi.number().required(),
  night: Joi.number().allow(null),
  week: Joi.number().allow(null),
  month: Joi.number().allow(null),
  hours: Joi.object().allow(null),
  ex_hours_checkout: Joi.object().allow(null),
  ex_hours_night_checkout: Joi.object().allow(null),
  ex_hours_checkin: Joi.object().allow(null),
  ex_hours_night_checkin: Joi.object().allow(null),
  ex_bed: Joi.number().allow(null),
  note: Joi.string().allow(null)
})

module.exports.CreatePriceResponseSchema = priceResponse.label('Response')

module.exports.DeletePriceSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeletePriceResponseSchema = Joi.bool().label('Response')

module.exports.GetListPriceQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.ListPriceResponseSchema = Joi.array().items(priceResponse).label('Response')

module.exports.GetPriceSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.GetPriceResponseSchema = priceResponse.label('Response')

module.exports.UpdatePriceParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdatePriceResponseSchema = Joi.bool().label('Response')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')
