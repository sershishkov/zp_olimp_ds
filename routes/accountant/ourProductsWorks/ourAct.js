const express = require('express');

const {
  add__OurAct,
  update__OurAct,
  getAll__OurActs,
  getOne__OurAct,
  delete__OurAct,
} = require('../../../controllers/accountant/ourProductsWorks/ourAct');

const { protect, authorize } = require('../../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__OurActs).post(add__OurAct);

router
  .route('/:id')
  .get(getOne__OurAct)
  .put(update__OurAct)
  .delete(delete__OurAct);

module.exports = router;
