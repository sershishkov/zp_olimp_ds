const express = require('express');

const {
  add__Firm,
  update__Firm,
  getAll__Firms,
  getOne__Firm,
  delete__Firm,
} = require('../../controllers/referenceData/firm');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Firms).post(add__Firm);

router.route('/:id').get(getOne__Firm).put(update__Firm).delete(delete__Firm);

module.exports = router;
