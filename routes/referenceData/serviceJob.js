const express = require('express');

const {
  add__ServiceJob,
  update__ServiceJob,
  getAll__ServiceJobs,
  getOne__ServiceJob,
  delete__ServiceJob,
} = require('../../controllers/referenceData/serviceJob');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__ServiceJobs).post(add__ServiceJob);

router
  .route('/:id')
  .get(getOne__ServiceJob)
  .put(update__ServiceJob)
  .delete(delete__ServiceJob);

module.exports = router;
