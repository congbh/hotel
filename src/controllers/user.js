const { withFirst, withInsert, withLimit, withOffset, withSelect, withReturning, withUpdate, withWhere } = require('./_hocHelpers')
const Boom = require('Boom')
const GUID = require('node-uuid')
const _ = require('lodash')
const Bcrypt = require('bcryptjs')
const Crypto = require('crypto')
const jwt = require('jsonwebtoken')
const knex = require('../db/connection')

const secret = ''
const db = knex('users')

const createResetPasswordToken = () => Crypto.randomBytes(20).toString('hex')

const updateResetPasswordToken = async (email, token) => {
  try {
    // let result = await knex('users')
    //   .where('email', email)
    //   .update({
    //     resetPasswordToken: token,
    //     resetPasswordExpires: Date.now() + 3600000 // 1 hour
    //   })
    const update = withUpdate({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000 // 1 hour
    })
    const where = withWhere('email', email)
    const result = await update(where(db))
    return result
  } catch (error) {
    throw error
  }
}

const hashPassword = async (password) => {
  try {
    const salt = await Bcrypt.genSalt()
    let hash = await Bcrypt.hash(password, salt)
    return hash
  } catch (error) {
    throw error
  }
}

const createToken = ({ id, username, guid }) => {
  return jwt.sign(
    {
      id: id,
      username: username,
      scope: guid
    },
    secret,
    {
      algorithm: 'HS256',
      expiresIn: '1h'
    }
  )
}

const findByUsernameOrEmail = async (username, email) => {
  try {
    let user = await knex('users')
      .modify(function (queryBuilder) {
        if (!_.isUndefined(username) && !_.isUndefined(email)) {
          queryBuilder.where('username', username).orWhere('email', email)
        } else {
          if (!_.isUndefined(username)) {
            queryBuilder.where('username', username)
          } else {
            queryBuilder.where('email', email)
          }
        }
      }).first()
    return user
  } catch (error) {
    throw error
  }
}

const verifyUniqueUser = async (request, h) => {
  try {
    const { username, email } = request.payload
    let user = await findByUsernameOrEmail(username, email)
    if (user) {
      if (_.isEqual(_.pick(user, 'email'), email)) {
        return Boom.badRequest('Email taken')
      }
      if (_.isEqual(_.pick(user, 'username'), username)) {
        return Boom.badRequest('Username taken')
      }
    }

    return h.response(request.payload).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const verifyCredentials = async (request, h) => {
  try {
    const { username, email, password } = request.payload
    let user = await findByUsernameOrEmail(username, email)
    if (!user) {
      throw Boom.badRequest('Invalid username or email')
    }
    let isValid = await Bcrypt.compare(password, user.password)
    if (!isValid) {
      throw Boom.badRequest('Invalid password')
    }
    return h.response(user)
  } catch (error) {
    throw error
  }
}

const getUsers = async (req, h) => {
  try {
    const { limit, offset } = req.params
    const select = withSelect(['id', 'email', 'guid', 'username', 'fullname', 'address', 'mobile', 'created_at'])
    const limitBy = withLimit(limit)
    const offsetBy = withOffset(offset)
    let result = await select(limitBy(offsetBy(db)))
    return h.response(result).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const createUser = async (req, h) => {
  try {
    const { username, email, password } = req.payload
    let hash = await hashPassword(password)
    let guid = GUID.v4()
    // let result = await knex('users')
    //   .returning(['id', 'email', 'guid', 'username'])
    //   .insert({
    //     username,
    //     email,
    //     password: hash,
    //     guid: guid
    //   })
    const returning = withReturning(['id', 'email', 'guid', 'username'])
    const insert = withInsert({
      username,
      email,
      password: hash,
      guid: guid
    })
    let result = await returning(insert(db))
    return h.response({result: _.isEqual(result.length, 1)}).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const getUser = async (req, h) => {
  try {
    const { guid } = req.params
    const first = withFirst(['id', 'email', 'guid', 'username'])
    const where = withWhere('guid', guid)
    let user = await first(where(db))
    return h.response(user).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const updateUser = async (req, h) => {
  try {
    const { guid } = req.params
    const where = withWhere('guid', guid)
    const update = withUpdate(req.payload)
    let result = await update(where(db))
    return h.response({ result: _.isEqual(result, 1) }).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const deleteUser = async (req, h) => {
  try {
    const { guid } = req.params
    const where = withWhere('guid', guid)
    let result = await where(db).del()
    // let result = await knex('users')
    //   .where('guid', guid)
    //   .del()
    return h.response({ result: _.isEqual(result, 1) }).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const authenticate = (request, h) => {
  let token = createToken(request.pre.user)
  if (token) {
    return h.response(token).code(200)
  }
  return Boom.unauthorized('Incorrect username or email')
}

const forgotPassword = async (req, h) => {
  try {
    const { email } = req.payload
    let user = await findByUsernameOrEmail(undefined, email)
    if (!user) {
      throw Boom.notFound('User not found')
    }
    let resetToken = createResetPasswordToken()
    let result = await updateResetPasswordToken(email, resetToken)
    return h.response({ result: _.isEqual(result, 1) }).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const verifyResetPasswordToken = async (req, h) => {
  try {
    const { token } = req.params
    // let user = await knex('users')
    //   .where('resetPasswordToken', token)
    //   .andWhere('resetPasswordExpires', '>', Date.now())
    //   .first('id', 'email', 'guid', 'username')
    const first = withFirst(['id', 'email', 'guid', 'username'])
    const andWhere = withWhere('resetPasswordExpires', Date.now(), '>')
    const where = withWhere('resetPasswordToken', token)
    let user = await first(andWhere(where(db)))
    if (!user) {
      throw Boom.notFound('Password reset token is invalid or has expired')
    }
    return h.response(user)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const resetPassword = async (req, h) => {
  try {
    const { password } = req.payload
    const { email } = req.pre.user

    let pwd = await hashPassword(password)

    // let result = await knex('users')
    //   .where('email', email)
    //   .update({
    //     password: pwd,
    //     resetPasswordToken: null,
    //     resetPasswordExpires: null
    //   })
    const update = withUpdate({
      password: pwd,
      resetPasswordToken: null,
      resetPasswordExpires: null
    })
    const where = withWhere('email', email)
    let result = await update(where(db))
    return h.response({ result: _.isEqual(result, 1) }).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports = {
  authenticate,
  createUser,
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
  resetPassword,
  updateUser,
  verifyCredentials,
  verifyResetPasswordToken,
  verifyUniqueUser
}
