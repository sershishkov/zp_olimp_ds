const express = require('express');

const {
  add__Equipment,
  update__Equipment,
  getAll__Equipments,
  getOne__Equipment,
  delete__Equipment,
} = require('../../controllers/referenceData/equipment');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Equipments).post(add__Equipment);

router
  .route('/:id')
  .get(getOne__Equipment)
  .put(update__Equipment)
  .delete(delete__Equipment);

module.exports = router;
