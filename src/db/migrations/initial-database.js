exports.up = (knex) => {
  return knex
    .schema
    .createTable('users', (table) => {
      // Primary Key
      table.increments()
      table.string('username', 50).unique().notNullable()
      table.string('password', 256).notNullable()
      table.string('email', 256).unique().notNullable()
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.string('resetPasswordToken', 256)
      table.bigInteger('resetPasswordExpires')
    })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
