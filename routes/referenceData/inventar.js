const express = require('express');

const {
  add__Inventar,
  update__Inventar,
  getAll__Inventars,
  getOne__Inventar,
  delete__Inventar,
} = require('../../controllers/referenceData/inventar');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Inventars).post(add__Inventar);

router
  .route('/:id')
  .get(getOne__Inventar)
  .put(update__Inventar)
  .delete(delete__Inventar);

module.exports = router;
