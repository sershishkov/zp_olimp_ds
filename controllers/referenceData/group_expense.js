const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Group_Expense = require('../../models/referenceData/Model__Group_Expense');
const Model__Expense = require('../../models/referenceData/Model__Expense');

//@desc   Add a __Group_Expense
//@route  POST /api/reference-data/group-expense
//@access Private
exports.add__Group_Expense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_Expense } = req.body;
  const new__Group_Expense = new Model__Group_Expense({
    name__Group_Expense,
  });

  await new__Group_Expense.save();

  res.status(200).json({
    success: true,
    data: new__Group_Expense,
  });
});

//@desc   Update a __Group_Expense
//@route  PUT /api/reference-data/group-expense/:id
//@access Private
exports.update__Group_Expense = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_Expense } = req.body;
  const new__Group_Expense = {
    name__Group_Expense,
  };

  const updated__Group_Expense = await Model__Group_Expense.findByIdAndUpdate(
    req.params.id,
    new__Group_Expense,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Group_Expense,
  });
});

//@desc   Get all __Group_Expenses
//@route  GET /api/reference-data/group-expense
//@access Private
exports.getAll__Group_Expenses = asyncHandler(async (req, res, next) => {
  const all__Group_Expenses = await Model__Group_Expense.find().sort({
    name__Group_Expense: 1,
  });
  //Check if  exists response
  if (!all__Group_Expenses) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Group_Expenses,
  });
});

//@desc   Get one __Group_Expense
//@route  GET /api/reference-data/group-expense/:id
//@access Private
exports.getOne__Group_Expense = asyncHandler(async (req, res, next) => {
  const one__Group_Expense = await Model__Group_Expense.findById(req.params.id);
  //Check if  exists response
  if (!one__Group_Expense) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Group_Expense,
  });
});

//@desc   DELETE one __Group_Expense
//@route  DELETE /api/reference-data/group-expense/:id
//@access Private
exports.delete__Group_Expense = asyncHandler(async (req, res, next) => {
  const one__Group_Expense = await Model__Group_Expense.findByIdAndDelete(
    req.params.id
  );

  const related__Expense = await Model__Expense.findOne({
    group_Expense: req.params.id,
  });

  if (related__Expense) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    //Check if  exists response
    if (!one__Group_Expense) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
