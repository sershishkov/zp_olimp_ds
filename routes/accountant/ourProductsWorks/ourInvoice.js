const express = require('express');

const {
  add__OurInvoice,
  update__OurInvoice,
  getAll__OurInvoices,
  getOne__OurInvoice,
  delete__OurInvoice,
} = require('../../../controllers/accountant/ourProductsWorks/ourInvoice');

const { protect, authorize } = require('../../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__OurInvoices).post(add__OurInvoice);

router
  .route('/:id')
  .get(getOne__OurInvoice)
  .put(update__OurInvoice)
  .delete(delete__OurInvoice);

module.exports = router;
