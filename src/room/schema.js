const Joi = require('joi')

module.exports.Error = Joi.object({
  error: {
    msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
    type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
  }
}).label('Error')

module.exports.GetRoomsQuerySchema = Joi.object({
  filter: Joi.object().allow(null),
  limit: Joi.number().integer().allow(null),
  offset: Joi.number().integer().allow(null)
})

module.exports.RoomsResponseSchema = Joi.array().items({
  id: Joi.string().guid(),
  name: Joi.string(),
  floor_id: Joi.string().guid(),
  room_type_id: Joi.string().guid(),
  status: Joi.string(),
  note: Joi.string(),
  room_mark_id: Joi.string().guid(),
  created_at: Joi.date(),
  updated_at: Joi.date()
})

module.exports.CreateRoomSchema = Joi.object({
  name: Joi.string().required(),
  floor_id: Joi.string().guid().required(),
  room_type_id: Joi.string().guid().required(),
  status: Joi.string().required(),
  note: Joi.string().allow(null),
  room_mark_id: Joi.string().guid().required()
})

module.exports.CreateRoomResponseSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  floor_id: Joi.string().guid(),
  room_type_id: Joi.string().guid(),
  status: Joi.string(),
  note: Joi.string().allow(null),
  room_mark_id: Joi.string().guid(),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).label('Response')

module.exports.GetRoomSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.GetRoomResponseSchema = Joi.object({
  id: Joi.string().guid(),
  name: Joi.string(),
  floor_id: Joi.string().guid(),
  room_type_id: Joi.string().guid(),
  status: Joi.string(),
  note: Joi.string().allow(null),
  room_mark_id: Joi.string().guid(),
  created_at: Joi.date(),
  updated_at: Joi.date()
}).label('Response')

module.exports.UpdateRoomParamSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.UpdateRoomPayloadSchema = Joi.object({
  name: Joi.string().required(),
  floor_id: Joi.string().guid().required(),
  room_type_id: Joi.string().guid().required(),
  status: Joi.string().required(),
  note: Joi.string().allow(null),
  room_mark_id: Joi.string().guid().required()
})

module.exports.UpdateRoomResponseSchema = Joi.bool().label('Response')

module.exports.DeleteRoomSchema = Joi.object({
  id: Joi.string().guid().required()
})

module.exports.DeleteRoomResponseSchema = Joi.bool().label('Response')
