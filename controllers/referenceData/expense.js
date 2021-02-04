const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Expense = require('../../models/referenceData/Model__Expense');

//@desc   Add a __Expense
//@route  POST /api/reference-data/expense
//@access Private
exports.add__Expense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Expense, group_Expense } = req.body;
  const new__Expense = new Model__Expense({
    name__Expense,
    group_Expense,
  });

  await new__Expense.save();

  res.status(200).json({
    success: true,
    data: new__Expense,
  });
});

//@desc   Update a __Expense
//@route  PUT /api/reference-data/expense/:id
//@access Private
exports.update__Expense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Expense, group_Expense } = req.body;
  const new__Expense = {
    name__Expense,
    group_Expense,
  };

  const updated__Expense = await Model__Expense.findByIdAndUpdate(
    req.params.id,
    new__Expense,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Expense,
  });
});

//@desc   Get all __Expenses
//@route  GET /api/reference-data/expense
//@access Private
exports.getAll__Expenses = asyncHandler(async (req, res, next) => {
  const all__Expenses = await Model__Expense.find()
    .populate({ path: 'group_Expense', select: 'name__Group_Expense' })
    .sort({
      name__Expense: 1,
    });
  //Check if  exists response
  if (!all__Expenses) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Expenses,
  });
});

//@desc   Get one __Expense
//@route  GET /api/reference-data/expense/:id
//@access Private
exports.getOne__Expense = asyncHandler(async (req, res, next) => {
  const one__Expense = await Model__Expense.findById(req.params.id);
  //Check if  exists response
  if (!one__Expense) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Expense,
  });
});

//@desc   DELETE one __Expense
//@route  DELETE /api/reference-data/expense/:id
//@access Private
exports.delete__Expense = asyncHandler(async (req, res, next) => {
  const one__Expense = await Model__Expense.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__Expense) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
