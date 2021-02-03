const express = require('express');

const {
  add__Instrument,
  update__Instrument,
  getAll__Instruments,
  getOne__Instrument,
  delete__Instrument,
} = require('../../controllers/referenceData/instrument');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Instruments).post(add__Instrument);

router
  .route('/:id')
  .get(getOne__Instrument)
  .put(update__Instrument)
  .delete(delete__Instrument);

module.exports = router;
