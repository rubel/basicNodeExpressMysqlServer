const { compareSync } = require('bcrypt');
const database = require('../config/mysql');
const { getHashedPassword } = require('../hash/hash');

module.exports = {
  create: (data, callback) => {
    database.query(
      `INSERT INTO users (uid,fname,lname,email,password) VALUES (?,?,?,?,?)`,
      [data.uid, data.fname, data.lname, data.email, data.password],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    database.query(
      `SELECT * FROM users WHERE email=?`,
      [email],
      (error, results) => {
        if (error) {
          return callback(error, null);
        }

        if (results.length === 0) {
          return callback({ msg: 'user not exist' }, null);
        }

        return callback(null, results[0]);
      }
    );
  },
  updatePassword: (userId, newPassword, callback) => {
    const hashedPassword = getHashedPassword(newPassword);
    database.query(
      `UPDATE users SET password=? WHERE id=?`,
      [hashedPassword, userId],
      (error, result) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, result);
      }
    );
  },
};
