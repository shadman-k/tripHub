const db = require('../db/index');

const userController = {};

userController.checkUser = (entry) => {
  console.log('entry: ', entry);
  const statement = `SELECT _id, google_id, display_name, email, image FROM people WHERE google_id = $1`
  const google_id = [entry];

  db.query(statement, google_id, (err, result) => {
    console.log('result from query: ', result.rows);
    if (err) console.log('There was an error with checkUser: ', err);
    else {
      if (!result.rows.length) {
        console.log('User does not exist in database. Need to add user to the database.');
        // return done(null, result);
        return result.rows;
      } else {
        console.log('User found, redirecting to /home');
        // return done(null, result);
        return result.rows;
      }
    }
  });
}

userController.addUser = (entry) => {

  console.log('entry: ', entry);
  const statement = `INSERT INTO people (google_id, display_name, email, image) VALUES($1, $2, $3, $4) RETURNING *`;
  
  db.query(statement, entry, async (err, result) => {
    console.log('result from query: ', result.rows);
    if (err) console.log('There was an error with addUser: ', err);
    else return await result.rows;
  });

}

module.exports = userController;
