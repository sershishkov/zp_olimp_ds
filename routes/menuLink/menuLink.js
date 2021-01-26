const express = require('express');

const {
  add__MenuLink,
  update__MenuLink,
  getAll__MenuLinks,
  getOne__MenuLink,
  delete__MenuLink,
} = require('../../controllers/menuLink/menuLink');

const { protect, authorize } = require('../../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(
    protect,
    //  authorize('admin'),
    getAll__MenuLinks
  )
  .post(protect, authorize('admin'), add__MenuLink);

router
  .route('/:id')
  .get(protect, authorize('admin'), getOne__MenuLink)
  .put(protect, authorize('admin'), update__MenuLink)
  .delete(protect, authorize('admin'), delete__MenuLink);

module.exports = router;
