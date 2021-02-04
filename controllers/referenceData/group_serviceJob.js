const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Group_ServiceJob = require('../../models/referenceData/Model__Group_ServiceJob');
const Model__ServiceJob = require('../../models/referenceData/Model__ServiceJob');

//@desc   Add a __Group_ServiceJob
//@route  POST /api/reference-data/group-service-job
//@access Private
exports.add__Group_ServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_ServiceJob } = req.body;
  const new__Group_ServiceJob = new Model__Group_ServiceJob({
    name__Group_ServiceJob,
  });

  await new__Group_ServiceJob.save();

  res.status(200).json({
    success: true,
    data: new__Group_ServiceJob,
  });
});

//@desc   Update a __Group_ServiceJob
//@route  PUT /api/reference-data/group-service-job/:id
//@access Private
exports.update__Group_ServiceJob = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_ServiceJob } = req.body;
  const new__Group_ServiceJob = {
    name__Group_ServiceJob,
  };

  const updated__Group_ServiceJob = await Model__Group_ServiceJob.findByIdAndUpdate(
    req.params.id,
    new__Group_ServiceJob,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Group_ServiceJob,
  });
});

//@desc   Get all __Group_ServiceJobs
//@route  GET /api/reference-data/group-service-job
//@access Private
exports.getAll__Group_ServiceJobs = asyncHandler(async (req, res, next) => {
  const all__Group_ServiceJobs = await Model__Group_ServiceJob.find().sort({
    name__Group_ServiceJob: 1,
  });
  //Check if  exists response
  if (!all__Group_ServiceJobs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Group_ServiceJobs,
  });
});

//@desc   Get one __Group_ServiceJob
//@route  GET /api/reference-data/group-service-job/:id
//@access Private
exports.getOne__Group_ServiceJob = asyncHandler(async (req, res, next) => {
  const one__Group_ServiceJob = await Model__Group_ServiceJob.findById(
    req.params.id
  );
  //Check if  exists response
  if (!one__Group_ServiceJob) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Group_ServiceJob,
  });
});

//@desc   DELETE one __Group_ServiceJob
//@route  DELETE /api/reference-data/group-service-job/:id
//@access Private
exports.delete__Group_ServiceJob = asyncHandler(async (req, res, next) => {
  const related__ServiceJob = await Model__ServiceJob.findOne({
    unit: req.params.id,
  });

  if (related__ServiceJob) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    const one__Group_ServiceJob = await Model__Group_ServiceJob.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!one__Group_ServiceJob) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
