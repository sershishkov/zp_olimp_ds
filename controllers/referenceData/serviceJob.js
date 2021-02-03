const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__ServiceJob = require('../../models/referenceData/Model__ServiceJob');

//@desc   Add a __ServiceJob
//@route  POST /api/reference-data/service-job
//@access Private
exports.add__ServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__ServiceJob,
    unit,
    group_ServiceJob,
    products,
    inventars,
    instruments,
    equipments,
  } = req.body;
  const new__ServiceJob = new Model__ServiceJob({
    name__ServiceJob,
    unit,
    group_ServiceJob,
    products,
    inventars,
    instruments,
    equipments,
  });

  await new__ServiceJob.save();

  res.status(200).json({
    success: true,
    data: new__ServiceJob,
  });
});

//@desc   Update a __ServiceJob
//@route  PUT /api/reference-data/service-job/:id
//@access Private
exports.update__ServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__ServiceJob,
    unit,
    group_ServiceJob,
    products,
    inventars,
    instruments,
    equipments,
  } = req.body;
  const new__ServiceJob = {
    name__ServiceJob,
    unit,
    group_ServiceJob,
    products,
    inventars,
    instruments,
    equipments,
  };

  const updated__ServiceJob = await Model__ServiceJob.findByIdAndUpdate(
    req.params.id,
    new__ServiceJob,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__ServiceJob,
  });
});

//@desc   Get all __ServiceJobs
//@route  GET /api/reference-data/service-job
//@access Private
exports.getAll__ServiceJobs = asyncHandler(async (req, res, next) => {
  const all__ServiceJobs = await Model__ServiceJob.find()
    .populate({ path: 'unit', select: 'name__Unit' })
    .populate({ path: 'products', select: 'name__Product' })
    .populate({ path: 'inventars', select: 'name__Inventar' })
    .populate({ path: 'instruments', select: 'name__Instrument' })
    .populate({ path: 'equipments', select: 'name__Equipment' })
    .sort({
      name__ServiceJob: 1,
    });
  //Check if  exists response
  if (!all__ServiceJobs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__ServiceJobs,
  });
});

//@desc   Get one __ServiceJob
//@route  GET /api/reference-data/service-job/:id
//@access Private
exports.getOne__ServiceJob = asyncHandler(async (req, res, next) => {
  const one__ServiceJob = await Model__ServiceJob.findById(req.params.id);
  //Check if  exists response
  if (!one__ServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__ServiceJob,
  });
});

//@desc   DELETE one __ServiceJob
//@route  DELETE /api/reference-data/service-job/:id
//@access Private
exports.delete__ServiceJob = asyncHandler(async (req, res, next) => {
  const one__ServiceJob = await Model__ServiceJob.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!one__ServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
