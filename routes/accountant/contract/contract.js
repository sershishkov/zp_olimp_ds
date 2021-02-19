const express = require('express');

const {
  add__Contract,
  update__Contract,
  getAll__Contracts,
  getOne__Contract,
  delete__Contract,
} = require('../../../controllers/accountant/contract/contract');

const { protect, authorize } = require('../../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Contracts).post(add__Contract);

router
  .route('/:id')
  .get(getOne__Contract)
  .put(update__Contract)
  .delete(delete__Contract);

module.exports = router;
