const express = require('express');

const {
  add__Our_User,
  update__Our_User,
  getAll__Our_Users,
  getOne__Our_User,
  delete__Our_User,
} = require('../../../controllers/user/admin/adminUsers');

const { protect, authorize } = require('../../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(getAll__Our_Users).post(add__Our_User);

router
  .route('/:id')
  .get(getOne__Our_User)
  .put(update__Our_User)
  .delete(delete__Our_User);

module.exports = router;
