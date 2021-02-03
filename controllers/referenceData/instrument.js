const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Instrument = require('../../models/referenceData/Model__Instrument');

//@desc   Add a __Instrument
//@route  POST /api/reference-data/instrument
//@access Private
exports.add__Instrument = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Instrument } = req.body;
  const new__Instrument = new Model__Instrument({
    name__Instrument,
  });

  await new__Instrument.save();

  res.status(200).json({
    success: true,
    data: new__Instrument,
  });
});

//@desc   Update a __Instrument
//@route  PUT /api/reference-data/instrument/:id
//@access Private
exports.update__Instrument = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Instrument } = req.body;
  const new__Instrument = {
    name__Instrument,
  };

  const updated__Instrument = await Model__Instrument.findByIdAndUpdate(
    req.params.id,
    new__Instrument,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Instrument,
  });
});

//@desc   Get all __Instruments
//@route  GET /api/reference-data/instrument
//@access Private
exports.getAll__Instruments = asyncHandler(async (req, res, next) => {
  const all__Instruments = await Model__Instrument.find().sort({
    name__Instrument: 1,
  });
  //Check if  exists response
  if (!all__Instruments) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Instruments,
  });
});

//@desc   Get one __Instrument
//@route  GET /api/reference-data/instrument/:id
//@access Private
exports.getOne__Instrument = asyncHandler(async (req, res, next) => {
  const one__Instrument = await Model__Instrument.findById(req.params.id);
  //Check if  exists response
  if (!one__Instrument) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Instrument,
  });
});

//@desc   DELETE one __Instrument
//@route  DELETE /api/reference-data/instrument/:id
//@access Private
exports.delete__Instrument = asyncHandler(async (req, res, next) => {
  const one__Instrument = await Model__Instrument.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!one__Instrument) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
