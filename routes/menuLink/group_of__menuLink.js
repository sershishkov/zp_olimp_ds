const express = require('express');

const {
  add__Group_of__MenuLink,
  update__Group_of__MenuLink,
  getAll__Group_of__MenuLinks,
  getOne__Group_of__MenuLink,
  delete__Group_of__MenuLink,
} = require('../../controllers/menuLink/group_of__menuLink');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(
    protect,
    //  authorize('admin'),
    getAll__Group_of__MenuLinks
  )
  .post(protect, authorize('admin'), add__Group_of__MenuLink);

router
  .route('/:id')
  .get(protect, authorize('admin'), getOne__Group_of__MenuLink)
  .put(protect, authorize('admin'), update__Group_of__MenuLink)
  .delete(protect, authorize('admin'), delete__Group_of__MenuLink);

module.exports = router;
