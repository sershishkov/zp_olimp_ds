const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Product = require('../../models/referenceData/Model__Product');
const Model__ServiceJob = require('../../models/referenceData/Model__ServiceJob');

//@desc   Add a __Product
//@route  POST /api/reference-data/product
//@access Private
exports.add__Product = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__Product,
    unit,
    group_Product,
    enteredPrice,
    sellingPrice,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  } = req.body;
  const new__Product = new Model__Product({
    name__Product,
    unit,
    group_Product,
    enteredPrice,
    sellingPrice,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  });

  await new__Product.save();

  res.status(200).json({
    success: true,
    data: new__Product,
  });
});

//@desc   Update a __Product
//@route  PUT /api/reference-data/product/:id
//@access Private
exports.update__Product = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__Product,
    unit,
    group_Product,
    enteredPrice,
    sellingPrice,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  } = req.body;
  const new__Product = {
    name__Product,
    unit,
    group_Product,
    enteredPrice,
    sellingPrice,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  };

  const updated__Product = await Model__Product.findByIdAndUpdate(
    req.params.id,
    new__Product,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Product,
  });
});

//@desc   Get all __Products
//@route  GET /api/reference-data/product
//@access Private
exports.getAll__Products = asyncHandler(async (req, res, next) => {
  const all__Products = await Model__Product.find()
    .populate({ path: 'unit', select: 'name__Unit' })
    .populate({ path: 'group_Product', select: 'name__Group_Product' })
    .sort({
      name__Product: 1,
    });
  //Check if  exists response
  if (!all__Products) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Products,
  });
});

//@desc   Get one __Product
//@route  GET /api/reference-data/product/:id
//@access Private
exports.getOne__Product = asyncHandler(async (req, res, next) => {
  const one__Product = await Model__Product.findById(req.params.id)
    .populate({ path: 'unit', select: 'name__Unit' })
    .populate({ path: 'group_Product', select: 'name__Group_Product' });
  //Check if  exists response
  if (!one__Product) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Product,
  });
});

//@desc   DELETE one __Product
//@route  DELETE /api/reference-data/product/:id
//@access Private
exports.delete__Product = asyncHandler(async (req, res, next) => {
  const one__Product = await Model__Product.findByIdAndDelete(req.params.id);
  const related__ServiceJob = await Model__ServiceJob.findOne({
    products: req.params.id,
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
    if (!one__Product) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
