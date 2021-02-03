const express = require('express');

const {
  add__Product,
  update__Product,
  getAll__Products,
  getOne__Product,
  delete__Product,
} = require('../../controllers/referenceData/product');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Products).post(add__Product);

router
  .route('/:id')
  .get(getOne__Product)
  .put(update__Product)
  .delete(delete__Product);

module.exports = router;
