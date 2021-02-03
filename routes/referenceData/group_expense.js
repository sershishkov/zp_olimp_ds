const express = require('express');

const {
  add__Group_Expense,
  update__Group_Expense,
  getAll__Group_Expenses,
  getOne__Group_Expense,
  delete__Group_Expense,
} = require('../../controllers/referenceData/group_expense');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Group_Expenses).post(add__Group_Expense);

router
  .route('/:id')
  .get(getOne__Group_Expense)
  .put(update__Group_Expense)
  .delete(delete__Group_Expense);

module.exports = router;
