const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const User = require('../../../models/user/User');

//@desc   Add a __Our_User
//@route  POST /api/user-admin
//@access Private
exports.add__Our_User = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name, email, role, myAvatar, password } = req.body;
  const new__Our_User = new User({
    name,
    email: email.toLowerCase(),
    role: role === 'admin' ? 'user' : role,
    myAvatar: myAvatar ? myAvatar : './uploads/default_user.jpg',
    password,
  });

  await new__Our_User.save();

  res.status(200).json({
    success: true,
    data: new__Our_User,
  });
});

//@desc   Update a __Our_User
//@route  PUT /api/user-admin/:id
//@access Private
exports.update__Our_User = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name, email, role, myAvatar, password } = req.body;
  const { id } = req.params;
  const new__Our_User = {
    name,
    email: email.toLowerCase(),
    role: role === 'admin' ? 'user' : role,
    myAvatar: myAvatar ? myAvatar : './uploads/default_user.jpg',
    password,
  };

  const updated__Our_User = await User.findByIdAndUpdate(id, new__Our_User, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: updated__Our_User,
  });
});

//@desc   Get all __Our_Users
//@route  GET /api/user-admin
//@access Private
exports.getAll__Our_Users = asyncHandler(async (req, res, next) => {
  const all__Our_Users = await User.find({}).sort({
    name: 1,
  });
  //Check if  exists response
  if (!all__Our_Users) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Our_Users,
  });
});

//@desc   Get one __Our_User
//@route  GET /api/user-admin/:id
//@access Private
exports.getOne__Our_User = asyncHandler(async (req, res, next) => {
  const one__Our_User = await User.findById(req.params.id);
  //Check if  exists response
  if (!one__Our_User) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Our_User,
  });
});

//@desc   DELETE one __Our_User
//@route  DELETE /api/user-admin/:id
//@access Private
exports.delete__Our_User = asyncHandler(async (req, res, next) => {
  const one__Our_User = await User.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__Our_User) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
