const express = require('express');

const {
  add__Worker,
  update__Worker,
  getAll__Workers,
  getOne__Worker,
  delete__Worker,
} = require('../../controllers/referenceData/worker');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('engineer', 'accountant', 'manager', 'boss', 'admin'));

router.route('/').get(getAll__Workers).post(add__Worker);

router
  .route('/:id')
  .get(getOne__Worker)
  .put(update__Worker)
  .delete(delete__Worker);

module.exports = router;
