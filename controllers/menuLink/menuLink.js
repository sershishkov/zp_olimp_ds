const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__MenuLink = require('../../models/menuLink/Model__MenuLink');

//@desc   Add a __MenuLink
//@route  POST /api/menu-link
//@access Private
exports.add__MenuLink = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__MenuLink, linkToPage, allowedRoles, group_Of_Page } = req.body;
  const new__MenuLink = new Model__MenuLink({
    name__MenuLink,
    linkToPage,
    allowedRoles,
    group_Of_Page,
  });

  await new__MenuLink.save();

  res.status(200).json({
    success: true,
    data: new__MenuLink,
  });
});

//@desc   Update a __MenuLink
//@route  PUT /api/menu-link/:id
//@access Private
exports.update__MenuLink = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__MenuLink, linkToPage, allowedRoles, group_Of_Page } = req.body;
  const new__MenuLink = {
    name__MenuLink,
    linkToPage,
    allowedRoles,
    group_Of_Page,
  };

  const updated__MenuLink = await Model__MenuLink.findByIdAndUpdate(
    req.params.id,
    new__MenuLink,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__MenuLink,
  });
});

//@desc   Get all __MenuLinks
//@route  GET /api/menu-link
//@access Private
exports.getAll__MenuLinks = asyncHandler(async (req, res, next) => {
  const all__MenuLinks = await Model__MenuLink.find({
    allowedRoles: req.user.role,
  }).sort({
    name__MenuLink: 1,
  });
  //Check if  exists response
  if (!all__MenuLinks) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__MenuLinks,
  });
});

//@desc   Get one __MenuLink
//@route  GET /api/menu-link/:id
//@access Private
exports.getOne__MenuLink = asyncHandler(async (req, res, next) => {
  const one__MenuLink = await Model__MenuLink.findById(req.params.id);
  //Check if  exists response
  if (!one__MenuLink) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__MenuLink,
  });
});

//@desc   DELETE one __MenuLink
//@route  DELETE /api/menu-link/:id
//@access Private
exports.delete__MenuLink = asyncHandler(async (req, res, next) => {
  const one__MenuLink = await Model__MenuLink.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__MenuLink) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
