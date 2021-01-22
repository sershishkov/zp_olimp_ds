const express = require('express');

const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
} = require('../../../controllers/user/auth/auth');

const { protect } = require('../../../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router;
