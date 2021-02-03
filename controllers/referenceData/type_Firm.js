const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Type_Firm = require('../../models/referenceData/Model__Type_Firm');

//@desc   Add a __Type_Firm
//@route  POST /api/reference-data/type-firm
//@access Private
exports.add__Type_Firm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Type_Firm, short_name__Type_Firm } = req.body;
  const new__Type_Firm = new Model__Type_Firm({
    name__Type_Firm,
    short_name__Type_Firm,
  });

  await new__Type_Firm.save();

  res.status(200).json({
    success: true,
    data: new__Type_Firm,
  });
});

//@desc   Update a __Type_Firm
//@route  PUT /api/reference-data/type-firm/:id
//@access Private
exports.update__Type_Firm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Type_Firm, short_name__Type_Firm } = req.body;
  const new__Type_Firm = {
    name__Type_Firm,
    short_name__Type_Firm,
  };

  const updated__Type_Firm = await Model__Type_Firm.findByIdAndUpdate(
    req.params.id,
    new__Type_Firm,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Type_Firm,
  });
});

//@desc   Get all __Type_Firms
//@route  GET /api/reference-data/type-firm
//@access Private
exports.getAll__Type_Firms = asyncHandler(async (req, res, next) => {
  const all__Type_Firms = await Model__Type_Firm.find()
    .populate({ path: 'group_Of_Page', select: 'name__Group_MenuLink' })
    .sort({
      name__Type_Firm: 1,
    });
  //Check if  exists response
  if (!all__Type_Firms) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Type_Firms,
  });
});

//@desc   Get one __Type_Firm
//@route  GET /api/reference-data/type-firm/:id
//@access Private
exports.getOne__Type_Firm = asyncHandler(async (req, res, next) => {
  const one__Type_Firm = await Model__Type_Firm.findById(req.params.id);
  //Check if  exists response
  if (!one__Type_Firm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Type_Firm,
  });
});

//@desc   DELETE one __Type_Firm
//@route  DELETE /api/reference-data/type-firm/:id
//@access Private
exports.delete__Type_Firm = asyncHandler(async (req, res, next) => {
  const one__Type_Firm = await Model__Type_Firm.findByIdAndDelete(
    req.params.id
  );

  //Check if  exists response
  if (!one__Type_Firm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
