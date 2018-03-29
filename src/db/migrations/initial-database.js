exports.up = (knex) => {
  try {
    return knex
      .schema
      .createTable('users', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('username', 50).unique().notNullable()
        table.string('password', 256).notNullable()
        table.string('email', 256).unique().notNullable()
        table.string('reset_token', 256).nullable()
        table.bigInteger('reset_expiry').nullable()
        table.string('fullname', 50).nullable()
        table.string('address', 250).nullable()
        table.string('mobile', 50).nullable()
        table.boolean('activated').default(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('hotel', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('name', 256).notNullable()
        table.integer('floor').notNullable()
        table.integer('room').notNullable()
        table.string('address', 256).notNullable()
        table.string('province', 50).notNullable()
        table.string('phone', 50).notNullable()
        table.string('email', 50).notNullable()
        table.string('website', 50).nullable()
        table.string('note', 250).nullable()
        table.uuid('created_by').references('id').inTable('users').onDelete('cascade')
        table.boolean('activated').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('floor', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('name', 256).notNullable()
        table.uuid('hotel_id').references('id').inTable('hotel').onDelete('cascade')
        table.uuid('created_by').references('id').inTable('users').onDelete('cascade')
        table.boolean('activated').defaultTo(false)
        table.integer('line_number').defaultTo(1)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('room', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('name', 256).notNullable()
        table.uuid('floor_id').references('id').inTable('floor').onDelete('cascade')
        table.uuid('room_type_id').notNullable() // .references('id').inTable('room_type').onDelete('cascade')
        table.string('status', 20).notNullable()
        table.string('note', 256).nullable()
        table.uuid('room_mark_id').notNullable() // .references('id').inTable('room_mark').onDelete('cascade')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('room_type', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('name', 64).notNullable()
        table.integer('num_bed').notNullable()
        table.integer('num_people').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('catalog', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('name', 256).notNullable()
        table.string('note', 256).nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('service', (table) => {
        table.uuid('id').notNullable().primary()
        table.string('name', 256).notNullable()
        table.json('catalog').notNullable()
        table.decimal('price').notNullable()
        table.decimal('other_price').nullable()
        table.boolean('in_warehouse').defaultTo(false)
        table.boolean('in_invoice').defaultTo(false)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('price', (table) => {
        table.uuid('id').notNullable().primary()
        table.uuid('room_type_id').notNullable()
        table.string('name', 64).notNullable()
        table.json('applied_time').nullable() // thoi diem ap dung
        table.decimal('day').notNullable()
        table.decimal('night').nullable()
        table.decimal('week').nullable()
        table.decimal('month').nullable()
        table.json('hours').nullable() // gia theo gio
        table.json('ex_hours_checkout').nullable() // phu troi qua gio checkout
        table.json('ex_hours_night_checkout').nullable() // phu troi qua gio checkout ( ap dung qua dem )
        table.json('ex_hours_checkin').nullable() // phu troi checkin som
        table.json('ex_hours_night_checkin').nullable() // phu troi checkin som ( ap dung qua dem )
        table.decimal('ex_bed').nullable() // phu troi qua nguoi
        table.string('note', 256).nullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
  } catch (error) {
    throw error
  }
}

exports.down = (knex) => {
  return knex
    .schema
    .dropTable('room')
    .dropTable('price')
    .dropTable('room_type')
    .dropTable('floor')
    .dropTable('hotel')
    .dropTable('users')
    .dropTable('catalog')
    .dropTable('service')
}
