const Joi = require('joi')

const roomTypeResponse = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  num_bed: Joi.number(),
  num_people: Joi.number(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

module.exports.CreateRoomTypeSchema = Joi.object({
  name: Joi.string().required(),
  num_bed: Joi.number().required(),
  num_people: Joi.number().required()
})

module.exports.CreateRoomTypeResponseSchema = roomTypeResponse.label('Response')

module.exports.DeleteRoomTypeSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteRoomTypeResponseSchema = Joi.bool().label('Response')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

module.exports.GetListRoomTypeQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.ListRoomTypeResponseSchema = Joi.array().items(roomTypeResponse).label('Response')

module.exports.GetRoomTypeSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.GetRoomTypeResponseSchema = roomTypeResponse.label('Response')

module.exports.UpdateRoomTypeParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateRoomTypePayloadSchema = Joi.object({
  name: Joi.string(),
  num_bed: Joi.number(),
  num_people: Joi.number()
})

module.exports.UpdateRoomTypeResponseSchema = Joi.bool().label('Response')
