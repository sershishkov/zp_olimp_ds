const express = require('express');

const {
  add__Group_Product,
  update__Group_Product,
  getAll__Group_Products,
  getOne__Group_Product,
  delete__Group_Product,
} = require('../../controllers/referenceData/group_product');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Group_Products).post(add__Group_Product);

router
  .route('/:id')
  .get(getOne__Group_Product)
  .put(update__Group_Product)
  .delete(delete__Group_Product);

module.exports = router;
