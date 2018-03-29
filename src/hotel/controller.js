
const Boom = require('Boom')
const GUID = require('node-uuid')

class HotelController {
  constructor ({ hotelService }) {
    this.hotelService = hotelService
  }

  async pong (req, h) {
    let result = await this.hotelService.pong()
    return h.response(result)
  }

  async prepong (req, h) {
    let result = await Promise.resolve({result: 'Pre check'})
    return h.response(result)
  }

  async create (req, h) {
    try {
      let id = GUID.v4()
      let hotel = {...req.payload, id}
      let result = await this.hotelService.create(hotel)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.hotelService.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async getOne (req, h) {
    try {
      const { id } = req.params
      let hotel = await this.hotelService.getOne(id)
      return h.response(hotel).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let hotel = {...req.payload, id}
      let result = await this.hotelService.update(hotel)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let result = await this.hotelService.list(filter, limit, offset)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = HotelController
