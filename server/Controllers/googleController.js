const db = require('../db/index');

const userController = {};

userController.checkUser = (entry) => {

  const statement = `SELECT _id, google_id, display_name, email, image FROM people WHERE google_id = $1`
  const google_id = [entry];

  return db.query(statement, google_id)
    .then(data => data.rows)
    .catch(err => console.log('There was an error with checkUser: ', err))
};

userController.addUser = (entry) => {

  const statement = `INSERT INTO people (google_id, display_name, email, image) VALUES($1, $2, $3, $4) RETURNING *`;

  return db.query(statement, entry)
    .then(data => data.rows)
    .catch(err => console.log('There was an error with addUser: ', err))
};

module.exports = userController;