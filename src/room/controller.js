
const Boom = require('boom')
const GUID = require('node-uuid')

class RoomController {
  constructor ({ roomService, connection: { db } }) {
    this.db = db
    this.roomService = roomService
  }

  async create (req, h) {
    try {
      let id = GUID.v4()
      let room = {...req.payload, id}
      let result = await this.roomService.create(room)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.roomService.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async getOne (req, h) {
    try {
      const { id } = req.params
      let room = await this.roomService.getOne(id)
      return h.response(room).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let room = {...req.payload, id}
      let result = await this.roomService.update(room)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let result = await this.roomService.list(filter, limit, offset)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = RoomController
