const express = require('express');

const {
  add__Type_Firm,
  update__Type_Firm,
  getAll__Type_Firms,
  getOne__Type_Firm,
  delete__Type_Firm,
} = require('../../controllers/referenceData/type_Firm');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Type_Firms).post(add__Type_Firm);

router
  .route('/:id')
  .get(getOne__Type_Firm)
  .put(update__Type_Firm)
  .delete(delete__Type_Firm);

module.exports = router;
