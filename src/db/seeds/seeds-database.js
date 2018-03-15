const bcrypt = require('bcryptjs')

exports.seed = (knex, Promise) => {
  return knex('users').del()
  .then(() => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync('congbh', salt)
    return Promise.join(
      knex('users').insert({
        username: 'congbh',
        email: 'bachhungcong@gmail.com',
        password: hash
      }) // eslint-disable-line
    )
  })
  .catch((err) => { console.log(err); }); // eslint-disable-line
}
