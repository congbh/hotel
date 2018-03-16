'use strict'

const withFirst = (column) => (query) => query.first(column)
const withInsert = data => query => query.insert(data)
const withLimit = value => (query) => query.limit(value)
const withOffset = value => (query) => query.offset(value)
const withReturning = column => query => query.returning(column)
const withSelect = columns => query => query.column(columns).select()
const withUpdate = data => query => query.update(data)
const withWhere = (field, value, operator = null) => (query) => operator ? query.where(field, operator, value) : query.where(field, value)

module.exports = {
  withFirst,
  withInsert,
  withLimit,
  withOffset,
  withReturning,
  withSelect,
  withUpdate,
  withWhere
}
