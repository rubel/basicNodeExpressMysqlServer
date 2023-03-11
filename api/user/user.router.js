const { checkToken } = require('../auth/checkToken');
const {
  registerUser,
  login,
  updatePassword,
} = require('../user/user.controller');

const router = require('express').Router();
router.post('/', registerUser);
router.patch('/updatePassword', checkToken, updatePassword);
router.post('/login', login);

module.exports = router;
