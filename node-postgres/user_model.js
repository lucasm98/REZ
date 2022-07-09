const Pool = require('pg').Pool
const pool = new Pool({
  user: 'react_user',
  host: 'localhost',
  database: 'rez',
  password: 'react_user',
  port: 5432,
});

const getUserList = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "user" ORDER BY user_id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}
const addUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, username, email, password } = body
    pool.query('INSERT INTO "user"("name", username, email, "password", "admin") VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, username, email, password, false], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  })
}
const deleteUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM "user" WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(id);
    })
  })
}

module.exports = {
  getUserList,
  addUser,
  deleteUser,
}