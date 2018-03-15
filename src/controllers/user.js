const Boom = require('Boom')
const bcrypt = require('bcryptjs')
const knex = require('../db/connection')
const _ = require('lodash')
const crypto = require('crypto')

const createResetPasswordToken = () => crypto.randomBytes(20).toString('hex')

const updateResetPasswordToken = async (email, token) => {
  try {
    let result = await knex('users')
    .where('email', email)
    .update({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000 // 1 hour
    })
    .returning('*')
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

const verifyUniqueUser = async (username, email) => {
  try {
    let result = await knex('users')
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
      })
      .first()
    return result
  } catch (error) {
    throw error
  }
}

const verifyCredentials = async (username, email, password) => {
  try {
    let user = await verifyUniqueUser(username, email)
    if (!user) {
      throw Boom.unauthorized('Invalid username or email')
    }
    let isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw Boom.unauthorized('Invalid password')
    }
    return user
  } catch (error) {
    throw error
  }
}

const verifyResetPassword = async (token) => {
  try {
    let user = await knex('users')
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '>', Date.now())
      .first()
    if (!user) {
      throw Boom.notFound('Password reset token is invalid or has expired')
    }
    return user
  } catch (error) {
    throw error
  }
}

const create = async (req, h) => {
  try {
    const { username, email, password } = req.payload
    let uniqueUser = await verifyUniqueUser(username, password)
    if (uniqueUser) {
      throw Boom.badData('Username Or Email taken')
    }
    let hash = await hashPassword(password)
    let result = await knex('users')
      .insert({
        username,
        email,
        password: hash
      })
      .returning('*')
    return h.response(result).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const authenticate = async (req, h) => {
  try {
    const { username, email, password } = req.payload
    let user = await verifyCredentials(username, email, password)
    if (!user) {
      throw Boom.notFound('User not found')
    }
    return h.response(user)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

const forgotPassword = async (req, h) => {
  try {
    const { email } = req.payload
    let user = await verifyUniqueUser(undefined, email)
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

const checkResetPasswordToken = async (req, h) => {
  try {
    const { token } = req.params
    let user = await knex('users')
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '>', Date.now())
      .first()
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
    const { token, password } = req.payload
    let user = await verifyResetPassword(token)
    let pwd = await hashPassword(password)

    let result = await knex('users')
      .where('email', user.email)
      .update({
        password: pwd,
        resetPasswordToken: null,
        resetPasswordExpires: null
      })
      .returning('*')
    return h.response(result).code(200)
  } catch (error) {
    return Boom.badRequest(error)
  }
}

module.exports = {
  create,
  authenticate,
  forgotPassword,
  checkResetPasswordToken,
  resetPassword
}
