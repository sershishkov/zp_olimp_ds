const express = require('express');

const {
  add__Group_ServiceJob,
  update__Group_ServiceJob,
  getAll__Group_ServiceJobs,
  getOne__Group_ServiceJob,
  delete__Group_ServiceJob,
} = require('../../controllers/referenceData/group_serviceJob');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(
  authorize('seller', 'engineer', 'accountant', 'manager', 'boss', 'admin')
);

router.route('/').get(getAll__Group_ServiceJobs).post(add__Group_ServiceJob);

router
  .route('/:id')
  .get(getOne__Group_ServiceJob)
  .put(update__Group_ServiceJob)
  .delete(delete__Group_ServiceJob);

module.exports = router;
