class HotelService {
  constructor ({ hotelRepository }) {
    this.repository = hotelRepository
  }

  async pong () {
    let result = await Promise.resolve('Success')
    return result
  }

  async create (hotel) {
    let result = await this.repository.create(hotel)
    return result
  }

  async delete (id) {
    let result = await this.repository.del(id)
    return result
  }

  async list (filter, limit, offset) {
    let result = await this.repository.list(filter, limit, offset)
    return result
  }

  async getOne (id) {
    let hotel = await this.repository.load(id)
    return hotel
  }

  async update (hotel) {
    let result = await this.repository.update(hotel)
    return result
  }
}

module.exports = HotelService
