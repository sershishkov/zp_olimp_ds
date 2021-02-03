const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Worker = require('../../models/referenceData/Model__Worker');

//@desc   Add a __Worker
//@route  POST /api/reference-data/worker
//@access Private
exports.add__Worker = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__Worker,
    middleName,
    surname,
    dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  } = req.body;
  const new__Worker = new Model__Worker({
    name__Worker,
    middleName,
    surname,
    dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  });

  await new__Worker.save();

  res.status(200).json({
    success: true,
    data: new__Worker,
  });
});

//@desc   Update a __Worker
//@route  PUT /api/reference-data/worker/:id
//@access Private
exports.update__Worker = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__Worker,
    middleName,
    surname,
    dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  } = req.body;

  const new__Worker = {
    name__Worker,
    middleName,
    surname,
    dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  };

  const updated__Worker = await Model__Worker.findByIdAndUpdate(
    req.params.id,
    new__Worker,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Worker,
  });
});

//@desc   Get all __Workers
//@route  GET /api/reference-data/worker
//@access Private
exports.getAll__Workers = asyncHandler(async (req, res, next) => {
  const all__Workers = await Model__Worker.find().sort({
    name__Worker: 1,
  });
  //Check if  exists response
  if (!all__Workers) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Workers,
  });
});

//@desc   Get one __Worker
//@route  GET /api/reference-data/worker/:id
//@access Private
exports.getOne__Worker = asyncHandler(async (req, res, next) => {
  const one__Worker = await Model__Worker.findById(req.params.id);
  //Check if  exists response
  if (!one__Worker) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Worker,
  });
});

//@desc   DELETE one __Worker
//@route  DELETE /api/reference-data/worker/:id
//@access Private
exports.delete__Worker = asyncHandler(async (req, res, next) => {
  const one__Worker = await Model__Worker.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__Worker) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
