require('dotenv').config();
const { compareSync } = require('bcrypt');
const { getHashedPassword } = require('../hash/hash.js');
const {
  create,
  getUserByEmail,
  updatePassword,
} = require('../user/user.service.js');
const database = require('../config/mysql');
const { sign } = require('jsonwebtoken');

module.exports = {
  registerUser: (req, res) => {
    const data = req.body;
    data.password = getHashedPassword(data.password);

    create(req.body, (error, results) => {
      if (error) {
        return res
          .status(201)
          .json({ msg: 'could not create user', error: error });
      }
      return res
        .status(200)
        .json({ msg: 'successfully created user', data: results });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email, (error, user) => {
      if (error) {
        return res
          .status(201)
          .json({ success: 0, msg: 'login failed', error: error });
      }
      let result = compareSync(password, user.password);
      let token = sign({ user: user }, process.env.TOKEN_SECRET, {
        expiresIn: '1h',
      });

      if (result) {
        user.password = null;
        return res.status(200).json({
          success: 1,
          data: user,
          msg: 'logged in successfully',
          token: token,
        });
      }

      return res
        .status(201)
        .json({ success: 0, msg: 'login failed', error: error });
    });
  },
  updatePassword: (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      return res.status(201).json({
        success: 0,
        msg: 'new password cant be same as old password',
      });
    }
    getUserByEmail(email, (error, user) => {
      if (error) {
        return res
          .status(201)
          .json({ msg: 'could not update password', error: error });
      }

      const result = compareSync(oldPassword, user.password);

      if (result) {
        updatePassword(user.id, newPassword, (error, result) => {
          if (error) {
            return res.status(201).json({
              success: 0,
              msg: 'Problem occurred when updating password',
              error: error,
            });
          }

          return res.status(200).json({
            success: 1,
            msg: 'Password updated successfully',
            data: result,
          });
        });
      } else {
        return res.status(201).json({ msg: 'Current password is wrong!' });
      }
    });
  },
};
