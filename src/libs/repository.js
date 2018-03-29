const { withFirst, withLimit, withOffset, withSelect, withWhere } = require('./hoc')
const _ = require('lodash')
class Repository {
    /**
     * Initialize the Repository
     * @constructor
     * @param {object} db The knex instance
     * @param {string} table The name of the SQL table
     */
  constructor (db, table) {
    this.db = db
    this.table = table
    this.baseQuery = db(table)
    this.timestamps = {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }

  updateTimestamps (fields) {
    if (this.timestamps) {
      const ts = [].slice.call(arguments, 1)
      const timestamps = this.timestamps
      const now = new Date()
      for (let i = 0, l = ts.length; i < l; ++i) {
        let column = timestamps[ts[i]]
        if (column) {
          fields[column] || (fields[column] = now)
        }
      }
    }
  }
    /**
     * Loads an entity from the given id
     * @param {int} id The object's id
     * @returns {object} The corresponding entity
     */
  async load (id) {
    try {
      const where = withWhere('id', id)
      const first = withFirst()
      let result = await first(where(this.baseQuery))
      return result
    } catch (error) {
      throw error
    }
    // return this.db(this.table)
    //   .where({ id })
    //   .select()
    //   .then(data => data[0])
  }

    /**
     * Lists the entities
     * @param {object} whereClause Conditions (optionnal)
     * @returns {array} A list of entities
     */
  async list (expression = {}, limit = null, offset = null) {
    try {
      expression || (expression = {})
      const where = withWhere(expression)
      const select = withSelect()
      let result = null
      if (!_.isNull(limit) && !_.isNull(offset)) {
        const limitBy = withLimit(limit)
        const offsetBy = withOffset(offset)
        result = await offsetBy(limitBy(select(where(this.baseQuery))))
      } else {
        result = await select(where(this.baseQuery))
      }
      return result
    } catch (error) {
      throw error
    }
  }

    /**
     * Persists a new entity in database
     * @param {object} object The entity to persist
     * @returns {object} An entity, with a database generated id
     */
  async create (object) {
    this.updateTimestamps(object, 'createdAt', 'updatedAt')
    let ids = await this.db(this.table)
        .returning('id')
        .insert(object)
    return { ...object, id: ids[0] }
  }

    /**
     * Updates an enitity in database
     * @param {object} object The entity to persist in database
     * @returns {boolean} True if the operation was a success
     */
  async update ({ id, ...rest }) {
    this.updateTimestamps(rest, 'updatedAt')
    return this.db(this.table)
      .where({ id })
      .update(rest)
      .then(() => true)
  }

    /**
     * Deletes an entity from database
     * @param {number} id The entity's id
     * @returns {boolean} True if the operation was a success
     */
  async delete (id) {
    return this.db(this.table)
      .where({ id })
      .del()
      .then(() => true)
  }

  async count (expression) {
    try {
      expression || (expression = '*')
      let count = await this.db(this.table)
        .count(expression)
      return parseInt(count[0].count, 10)
    } catch (error) {
      throw error
    }
  }

  /**
     * Updates an enitity in database
     * @param {object} object The entity to persist in database
     * @returns {boolean} True if the operation was a success
     */
  async findOr (object) {
    return this.db(this.table)
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
}

module.exports = Repository
