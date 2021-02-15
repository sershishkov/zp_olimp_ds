const express = require('express');

const {
  add__OurNakl,
  update__OurNakl,
  getAll__OurNakls,
  getOne__OurNakl,
  delete__OurNakl,
} = require('../../../controllers/accountant/ourProductsWorks/ourNakl');

const { protect, authorize } = require('../../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__OurNakls).post(add__OurNakl);

router
  .route('/:id')
  .get(getOne__OurNakl)
  .put(update__OurNakl)
  .delete(delete__OurNakl);

module.exports = router;
