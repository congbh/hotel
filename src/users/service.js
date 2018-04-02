const Crypto = require('crypto')
const Bcrypt = require('bcryptjs')
const GUID = require('node-uuid')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { API } = require('../config')

class UserService {
  constructor ({ userRepository }) {
    this.repository = userRepository
    this.toModel = (entity) => {
      return _.omit(entity, ['password', 'reset_token', 'reset_expiry'])
    }
  }

  async _findByUsernameOrEmail (object) {
    let result = await this.repository
      .findOr(object)
    return _.head(result)
  }

  async _hashPassword (password) {
    const salt = await Bcrypt.genSalt()
    let hash = await Bcrypt.hash(password, salt)
    return hash
  }

  async _verifyUniqueUser (username, email) {
    try {
      let usr = await this._findByUsernameOrEmail({ username, email })
      if (usr) {
        if (_.isEqual(_.pick(usr, 'email'), { email })) {
          throw new Error('Email taken')
        }
        if (_.isEqual(_.pick(usr, 'username'), { username })) {
          throw new Error('Username taken')
        }
      }
      return true
    } catch (error) {
      throw error
    }
  }

  async _verifyCredentials (username, email, password) {
    let user = await this._findByUsernameOrEmail({ username, email })
    if (!user) {
      throw new Error('Invalid username or email')
    }
    let isValid = await Bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid password')
    }
    return user
  }

  async _createToken ({ id, email }) {
    const token = jwt.sign(
      {
        id: id,
        email: email
      },
      API.SECRET_KEY,
      {
        algorithm: 'HS256',
        expiresIn: '1h'
      }
    )
    const refreshToken = jwt.sign(
      {
        id: id,
        email: email
      },
      API.SECRET_KEY,
      {
        expiresIn: '7d'
      }
    )
    return Promise.all([token, refreshToken])
  }

  async refreshToken (payload) {
    try {
      const { refresh_token } = payload
      const { id } = jwt.verify(refresh_token, API.SECRET_KEY)
      let user = await this.repository.load(id)
      const [_token, _refreshToken] = await this._createToken(user)
      return {
        token: _token,
        refresh_token: _refreshToken,
        id
      }
    } catch (error) {
      throw error
    }
  }

  async authenticate (payload) {
    try {
      const { username = '', email = '', password } = payload
      let user = await this._verifyCredentials(username, email, password)
      const [token, refresh_token] = this._createToken(user) // eslint-disable-line camelcase
      return { token, refresh_token, id: user.id }
    } catch (error) {
      throw error
    }
  }

  async create (payload) {
    try {
      const { email, username } = payload
      let ensureUnique = await this._verifyUniqueUser(username, email)
      if (ensureUnique) {
        let password = await this._hashPassword(payload.password)
        let id = GUID.v4()
        let object = _.omit(payload, ['password'])
        let user = { ...object, id, password }
        let result = await this.repository.create(user)
        result = _.omit(result, ['password', 'reset_token', 'reset_expiry'])
        return result
      }
    } catch (error) {
      throw error
    }
  }

  async delete (id) {
    let result = await this.repository.del(id)
    return result
  }

  async list (filter, limit, offset) {
    let result = await this.repository.list(filter, limit, offset)
    result = result.map(user => _.omit(user, ['password', 'reset_token', 'reset_expiry']))
    return result
  }

  async getOne (id) {
    let user = await this.repository.load(id)
    return this.toModel(user)
  }

  async update (user) {
    let result = await this.repository.update(user)
    return result
  }

  async forgotPassword (email) {
    try {
      let user = this._findByUsernameOrEmail({ email })
      if (!user) {
        throw new Error('User not found')
      }
      let token = Crypto.randomBytes(20).toString('hex')
      let updated = {
        id: user.id,
        reset_token: token,
        reset_expiry: Date.now() + 3600000 // 1 hour
      }
      let result = await this.repository.update(updated)
      return result
    } catch (error) {
      throw error
    }
  }

  async verifyResetPasswordToken (token) {
    let user = await this.repository.getByToken(token)
    return user
  }

  async resetPassword (token, password) {
    try {
      let user = await this.verifyResetPasswordToken(token)
      if (user) {
        let pwd = await this._hashPassword(password)
        let update = {
          id: user.id,
          password: pwd,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }
        let result = await this.repository.update(update)
        return result
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService
