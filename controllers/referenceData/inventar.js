const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Inventar = require('../../models/referenceData/Model__Inventar');
const Model__ServiceJob = require('../../models/referenceData/Model__ServiceJob');

//@desc   Add a __Inventar
//@route  POST /api/reference-data/inventar
//@access Private
exports.add__Inventar = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Inventar, unit } = req.body;
  const new__Inventar = new Model__Inventar({
    name__Inventar,
    unit,
  });

  await new__Inventar.save();

  res.status(200).json({
    success: true,
    data: new__Inventar,
  });
});

//@desc   Update a __Inventar
//@route  PUT /api/reference-data/inventar/:id
//@access Private
exports.update__Inventar = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Inventar, unit } = req.body;
  const new__Inventar = {
    name__Inventar,
    unit,
  };

  const updated__Inventar = await Model__Inventar.findByIdAndUpdate(
    req.params.id,
    new__Inventar,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Inventar,
  });
});

//@desc   Get all __Inventars
//@route  GET /api/reference-data/inventar
//@access Private
exports.getAll__Inventars = asyncHandler(async (req, res, next) => {
  const all__Inventars = await Model__Inventar.find().sort({
    name__Inventar: 1,
  });
  //Check if  exists response
  if (!all__Inventars) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Inventars,
  });
});

//@desc   Get one __Inventar
//@route  GET /api/reference-data/inventar/:id
//@access Private
exports.getOne__Inventar = asyncHandler(async (req, res, next) => {
  const one__Inventar = await Model__Inventar.findById(req.params.id);
  //Check if  exists response
  if (!one__Inventar) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Inventar,
  });
});

//@desc   DELETE one __Inventar
//@route  DELETE /api/reference-data/inventar/:id
//@access Private
exports.delete__Inventar = asyncHandler(async (req, res, next) => {
  const one__Inventar = await Model__Inventar.findByIdAndDelete(req.params.id);
  const related__ServiceJob = await Model__ServiceJob.findOne({
    inventars: req.params.id,
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
    if (!one__Inventar) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
