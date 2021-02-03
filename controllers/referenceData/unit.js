const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Unit = require('../../models/referenceData/Model__Unit');

//@desc   Add a __Unit
//@route  POST /api/reference-data/unit
//@access Private
exports.add__Unit = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Unit } = req.body;
  const new__Unit = new Model__Unit({
    name__Unit,
  });

  await new__Unit.save();

  res.status(200).json({
    success: true,
    data: new__Unit,
  });
});

//@desc   Update a __Unit
//@route  PUT /api/reference-data/unit/:id
//@access Private
exports.update__Unit = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Unit } = req.body;
  const new__Unit = {
    name__Unit,
  };

  const updated__Unit = await Model__Unit.findByIdAndUpdate(
    req.params.id,
    new__Unit,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Unit,
  });
});

//@desc   Get all __Units
//@route  GET /api/reference-data/unit
//@access Private
exports.getAll__Units = asyncHandler(async (req, res, next) => {
  const all__Units = await Model__Unit.find().sort({
    name__Unit: 1,
  });
  //Check if  exists response
  if (!all__Units) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Units,
  });
});

//@desc   Get one __Unit
//@route  GET /api/reference-data/unit/:id
//@access Private
exports.getOne__Unit = asyncHandler(async (req, res, next) => {
  const one__Unit = await Model__Unit.findById(req.params.id);
  //Check if  exists response
  if (!one__Unit) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Unit,
  });
});

//@desc   DELETE one __Unit
//@route  DELETE /api/reference-data/unit/:id
//@access Private
exports.delete__Unit = asyncHandler(async (req, res, next) => {
  const one__Unit = await Model__Unit.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__Unit) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
