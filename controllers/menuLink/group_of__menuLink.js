const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Group_of__MenuLink = require('../../models/menuLink/Model__Group_of__MenuLink');
const Model__MenuLink = require('../../models/menuLink/Model__MenuLink');

//@desc   Add a __Group_of__MenuLink
//@route  POST /api/group-of-menu-link
//@access Private
exports.add__Group_of__MenuLink = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_MenuLink, allowedRoles } = req.body;

  const new__Group_of__MenuLink = new Model__Group_of__MenuLink({
    name__Group_MenuLink,
    allowedRoles,
  });

  await new__Group_of__MenuLink.save();

  res.status(200).json({
    success: true,
    data: new__Group_of__MenuLink,
  });
});

//@desc   Update a __Group_of__MenuLink
//@route  PUT /api/group-of-menu-link/:id
//@access Private
exports.update__Group_of__MenuLink = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_MenuLink, allowedRoles } = req.body;
  const new__Group_of__MenuLink = {
    name__Group_MenuLink,
    allowedRoles,
  };

  const updated__Group_of__MenuLink = await Model__Group_of__MenuLink.findByIdAndUpdate(
    req.params.id,
    new__Group_of__MenuLink,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Group_of__MenuLink,
  });
});

//@desc   Get all __Group_of__MenuLinks
//@route  GET /api/group-of-menu-link
//@access Private
exports.getAll__Group_of__MenuLinks = asyncHandler(async (req, res, next) => {
  const all__Group_of__MenuLinks = await Model__Group_of__MenuLink.find({
    allowedRoles: req.user.role,
  }).sort({
    name__Group_of__MenuLink: 1,
  });
  //Check if  exists response
  if (!all__Group_of__MenuLinks) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Group_of__MenuLinks,
  });
});

//@desc   Get one __Group_of__MenuLink
//@route  GET /api/group-of-menu-link/:id
//@access Private
exports.getOne__Group_of__MenuLink = asyncHandler(async (req, res, next) => {
  const one__Group_of__MenuLink = await Model__Group_of__MenuLink.findById(
    req.params.id
  );
  //Check if  exists response
  if (!one__Group_of__MenuLink) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Group_of__MenuLink,
  });
});

//@desc   DELETE one __Group_of__MenuLink
//@route  DELETE /api/group-of-menu-link/:id
//@access Private
exports.delete__Group_of__MenuLink = asyncHandler(async (req, res, next) => {
  const related__Page = await Model__MenuLink.findOne({
    group_Of_Page: req.params.id,
  });

  if (related__Page) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const one__Group_of__MenuLink = await Model__Group_of__MenuLink.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!one__Group_of__MenuLink) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
