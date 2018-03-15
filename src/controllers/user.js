const Boom = require('Boom')
const bcrypt = require('bcryptjs')
const knex = require('../db/connection')
const _ = require('lodash')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const secret = ''

const createResetPasswordToken = () => crypto.randomBytes(20).toString('hex')

const updateResetPasswordToken = async (email, token) => {
  try {
    let result = await knex('users')
      .where('email', email)
      .update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000 // 1 hour
      })
    return result
  } catch (error) {
    throw error
  }
}

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt()
    let hash = await bcrypt.hash(password, salt)
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
    let isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw Boom.badRequest('Invalid password')
    }
    return h.response(user)
  } catch (error) {
    throw error
  }
}

const createUser = async (req, h) => {
  try {
    const { username, email, password } = req.payload
    let hash = await hashPassword(password)
    let result = await knex('users')
      .insert({
        username,
        email,
        password: hash
      })
      .returning(['id', 'email', 'guid', 'username'])
    return h.response(result).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const getUser = async (req, h) => {
  try {
    const { guid } = req.params
    let result = await knex('users')
      .where('guid', guid)
      .returning(['id', 'email', 'guid', 'username'])
    return h.response(result).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const updateUser = async (req, h) => {
  try {
    const { guid } = req.params
    const { user: { firstname, lastname, mobile, address } } = req.payload
    let result = await knex('users')
      .where('guid', guid)
      .update({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        address: address
      })
    return h.response(result).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const deleteUser = async (req, h) => {
  try {
    const { guid } = req.params
    let result = await knex('users')
      .where('guid', guid)
      .del()
    return h.response(result).code(200)
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
    return h.response(result)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const verifyResetPasswordToken = async (req, h) => {
  try {
    const { token } = req.params
    let user = await knex('users')
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '>', Date.now())
      .first('id', 'email', 'guid', 'username')
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

    let result = await knex('users')
      .where('email', email)
      .update({
        password: pwd,
        resetPasswordToken: null,
        resetPasswordExpires: null
      })
    return h.response(result).code(200)
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
  resetPassword,
  updateUser,
  verifyCredentials,
  verifyResetPasswordToken,
  verifyUniqueUser
}
