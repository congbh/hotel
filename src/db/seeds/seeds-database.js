const bcrypt = require('bcryptjs')
const GUID = require('node-uuid')

exports.seed = (knex, Promise) => {
  return knex('room').del()
  .then(() => {
    return knex('floor').del()
  })
  .then(() => {
    return knex('hotel').del()
  })
  .then(() => {
    return knex('users').del()
  })
  .then(() => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('congbh', salt)
    return knex('users')
      .returning('id')
      .insert({
        email: 'bachhungcong@gmail.com',
        id: GUID.v4(),
        password: hash,
        username: 'congbh',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      }) // eslint-disable-line
  })
  .then((userIds) => {
    return knex('hotel')
      .returning(['id', 'created_by'])
      .insert({
        activated: true,
        address: '16 An Duong Vuong',
        created_by: userIds[0],
        email: 'abc@gmail.com',
        floor: 4,
        id: GUID.v4(),
        name: 'Phuong Dong Hotel',
        note: 'abc',
        phone: '09888888',
        province: 'TP.Vinh',
        room: 20,
        website: 'xxx',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      }) // eslint-disable-line
  })
  .then((hotels) => {
    return knex('floor')
      .returning('id')
      .insert({
        activated: true,
        created_by: hotels[0].created_by,
        hotel_id: hotels[0].id,
        id: GUID.v4(),
        line_number: 1,
        name: 'Tang 1',
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      }) // eslint-disable-line
  })
  .then((floorIds) => {
    return knex('room')
      .insert({
        id: GUID.v4(),
        name: '101',
        floor_id: floorIds[0],
        room_type_id: GUID.v4(),
        status: 'READY',
        note: 'noted',
        room_mark_id: GUID.v4()
      }) // eslint-disable-line
  })
  .catch((err) => { console.log(err); }); // eslint-disable-line
}
