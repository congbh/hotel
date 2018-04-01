const Boom = require('boom')
const Crypto = require('crypto')
const atob = require('atob')
// const secret = ''

class UserController {
  constructor ({ userService }) {
    this.userService = userService
  }

  _createResetPasswordToken () {
    return Crypto.randomBytes(20).toString('hex')
  }

  _parseJwt (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(atob(base64))
  }

  async _updateResetPasswordToken (id, token) {
    let usr = {
      id,
      reset_token: token,
      reset_expiry: Date.now() + 3600000 // 1 hour
    }
    let result = await this.userService.update(usr)
    return result
  }

  async authenticate (request, h) {
    try {
      let { token, id } = await this.userService.authenticate(request.payload)
      return h.response({ token, uid: id }).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async create (request, h) {
    try {
      let result = await this.userService.create(request.payload)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async delete (req, h) {
    try {
      const { id } = req.params
      let result = await this.userService.delete(id)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async getOne (req, h) {
    try {
      const { id } = req.params
      let user = await this.userService.getOne(id)
      return h.response(user).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async me (req, h) {
    try {
      const { headers: { authorization } } = req
      let { id } = this._parseJwt(authorization)
      let user = await this.userService.getOne(id)
      return h.response(user).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async update (req, h) {
    try {
      const { id } = req.params
      let user = {...req.payload, id}
      let result = await this.userService.update(user)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async list (req, h) {
    try {
      const { filter = {}, limit = null, offset = null } = req.query
      let users = await this.userService.list(filter, limit, offset)
      return h.response(users).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async forgotPassword (req, h) {
    try {
      const { email } = req.payload
      let result = await this.userService.forgotPassword(email)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async verifyResetPasswordToken (req, h) {
    try {
      const { token } = req.params
      let result = await this.userService.verifyResetPasswordToken(token)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }

  async resetPassword (req, h) {
    try {
      const { password, token } = req.payload
      let result = await this.userService.resetPassword(password, token)
      return h.response(result).code(200)
    } catch (error) {
      return Boom.badRequest(error)
    }
  }
}

module.exports = UserController
