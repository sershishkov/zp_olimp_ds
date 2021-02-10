const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Equipment = require('../../models/referenceData/Model__Equipment');
const Model__ServiceJob = require('../../models/referenceData/Model__ServiceJob');

//@desc   Add a __Equipment
//@route  POST /api/reference-data/equipment
//@access Private
exports.add__Equipment = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Equipment, unit } = req.body;
  const new__Equipment = new Model__Equipment({
    name__Equipment,
    unit,
  });

  await new__Equipment.save();

  res.status(200).json({
    success: true,
    data: new__Equipment,
  });
});

//@desc   Update a __Equipment
//@route  PUT /api/reference-data/equipment/:id
//@access Private
exports.update__Equipment = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Equipment, unit } = req.body;
  const new__Equipment = {
    name__Equipment,
    unit,
  };

  const updated__Equipment = await Model__Equipment.findByIdAndUpdate(
    req.params.id,
    new__Equipment,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Equipment,
  });
});

//@desc   Get all __Equipments
//@route  GET /api/reference-data/equipment
//@access Private
exports.getAll__Equipments = asyncHandler(async (req, res, next) => {
  const all__Equipments = await Model__Equipment.find()
    .populate({ path: 'unit', select: 'name__Unit' })
    .sort({
      name__Equipment: 1,
    });
  //Check if  exists response
  if (!all__Equipments) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Equipments,
  });
});

//@desc   Get one __Equipment
//@route  GET /api/reference-data/equipment/:id
//@access Private
exports.getOne__Equipment = asyncHandler(async (req, res, next) => {
  const one__Equipment = await Model__Equipment.findById(
    req.params.id
  ).populate({ path: 'unit', select: 'name__Unit' });
  //Check if  exists response
  if (!one__Equipment) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Equipment,
  });
});

//@desc   DELETE one __Equipment
//@route  DELETE /api/reference-data/equipment/:id
//@access Private
exports.delete__Equipment = asyncHandler(async (req, res, next) => {
  const one__Equipment = await Model__Equipment.findByIdAndDelete(
    req.params.id
  );
  const related__ServiceJob = await Model__ServiceJob.findOne({
    'equipments.equipment': req.params.id,
  });

  if (related__ServiceJob) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    //Check if  exists response
    if (!one__Equipment) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
