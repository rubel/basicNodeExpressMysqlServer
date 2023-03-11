const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const saltRounds = 10;

module.exports = {
  getHashedPassword: (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },
};
