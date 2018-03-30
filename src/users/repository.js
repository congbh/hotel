const _ = require('lodash')
const { TABLES: { USER } } = require('../config')

module.exports = function ({ connection }) {
  if (!connection) {
    throw new Error('No conn specified')
  }

  const timestamps = {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }

  const _updateTimestamps = (fields) => {
    if (timestamps) {
      const ts = [].slice.call(arguments, 1)
      const now = new Date()
      for (let i = 0, l = ts.length; i < l; ++i) {
        let column = timestamps[ts[i]]
        if (column) {
          fields[column] || (fields[column] = now)
        }
      }
    }
  }

  const create = async (object) => {
    _updateTimestamps(object, 'createdAt', 'updatedAt')
    let ids = await connection(USER)
      .returning('id')
      .insert(object)
    return { ...object, id: ids[0] }
  }

  const del = id => {
    return connection(USER)
      .where({ id })
      .del()
      .then(() => true)
  }

  const load = async (id) => {
    let result = await connection(USER)
      .where({ id })
      .select()
      .then(data => data[0])
    return result
  }

  const update = async ({ id, ...rest }) => {
    _updateTimestamps(rest, 'updatedAt')
    return connection(USER)
      .where({ id })
      .update(rest)
      .then(() => true)
  }

  const findOr = async (object) => {
    return connection(USER)
    .modify(function (queryBuilder) {
      let keys = Object.keys(object)
      for (let i = 0, l = keys.length; i < l; i++) {
        let key = keys[i]
        let val = object[keys[i]]
        if (i === 0 && !_.isUndefined(val)) {
          queryBuilder.where(key, val)
        } else {
          if (!_.isUndefined(val)) {
            queryBuilder.orWhere(key, val)
          }
        }
      }
    })
  }

  const list = async (filters = {}, limit = null, offset = null) => {
    filters || (filters = {})
    limit || (limit = null)
    offset || (offset = null)
    let result = null
    if (!_.isNull(limit) && !_.isNull(offset)) {
      result = await connection(USER)
        .select()
        .where(filters)
        .limit(limit)
        .offset(offset)
    } else {
      result = await connection(USER).select().where(filters)
    }
    return result
  }

  const getByToken = async (token) => {
    let user = await connection(USER)
            .where('reset_token', token)
            .andWhere('reset_expiry', '>', Date.now())
            .first('id', 'email', 'username')
    return user
  }

  return {
    create,
    del,
    findOr,
    getByToken,
    list,
    load,
    update
  }
}
