exports.up = (knex) => {
  knex.raw('create extension if not exists "uuid-ossp"')
  return knex
    .schema
    .createTable('users', (table) => {
      // Primary Key
      table.increments()
      table.string('username', 50).unique().notNullable()
      table.string('password', 256).notNullable()
      table.string('email', 256).unique().notNullable()
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.string('resetPasswordToken', 256).nullable()
      table.bigInteger('resetPasswordExpires').nullable()
      table.string('guid', 36).unique().notNullable()
      table.string('fullname', 50).nullable()
      table.string('address', 250).nullable()
      table.string('mobile', 50).nullable()
    })
}

exports.down = (knex) => {
  knex.raw('drop extension if exists "uuid-ossp"')
  return knex.schema.dropTable('users')
}
