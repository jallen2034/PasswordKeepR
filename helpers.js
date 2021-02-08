// PG database client/connection setup
// const { db, Pool } = require('../db/dbConn');
// db.connect();

// install pg and connect to the lightbnb database at the top of the database.js file.
const { Pool } = require('pg');
const { user } = require('pg/lib/defaults');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/* helper function to check if a users email address already exists in our database - FIXED!
 * return a promise with false inside it if no userId exists */
const emailExists = function (userEmail) {

  if (userEmail) {
    const query = `
       SELECT email
       FROM users
       WHERE email = '${userEmail}';
      `
    return pool.query(query)
      .then(res => {

        // if email not found in db, res.rows.length === 0, we catch this
        if (res.rows.length === 0) {
          return false;
        } else {
          return true;
        } 
      });
  }
  
  return Promise.resolve(false);
};

// helper function that takes in req.body.email as "userEmail" and the users object, added hashing! much security! - WORKS!
const passwordValidator = function (userPassword, userEmail) {

  const query = `
     SELECT id, master_password 
     FROM users 
     WHERE email = '${userEmail}';
    `

  return pool.query(query)
    .then(res => {

      if (res.rows[0].master_password === userPassword) {
        return res.rows[0].id;
      } else {
        return false;
      }
    });
};

/* helper function that will determine if a user is authorized to be logged in or not
 * queries our db with the, return a promise with a false value if no userId exists */
const isAuthenticated = function (userId) {

  if (userId) {
    const query = `
    SELECT id 
    FROM users
    WHERE id = '${userId}'
    `;
  
    return pool.query(query)
      .then(res => {
  
        console.log("res value: \n", res.rows[0].id);

        if (res.rows.length === 0) {
          return false;
        } else {
          return res.rows[0].id;
        } 
      });
  }

  return Promise.resolve(false);
};

// export these helper functions to where they are needed
module.exports = { emailExists, passwordValidator, isAuthenticated };