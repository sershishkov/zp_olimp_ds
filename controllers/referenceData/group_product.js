const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Group_Product = require('../../models/referenceData/Model__Group_Product');
const Model__Product = require('../../models/referenceData/Model__Product');

//@desc   Add a __Group_Product
//@route  POST /api/reference-data/group-product
//@access Private
exports.add__Group_Product = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_Product } = req.body;
  const new__Group_Product = new Model__Group_Product({
    name__Group_Product,
  });

  await new__Group_Product.save();

  res.status(200).json({
    success: true,
    data: new__Group_Product,
  });
});

//@desc   Update a __Group_Product
//@route  PUT /api/reference-data/group-product/:id
//@access Private
exports.update__Group_Product = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const { name__Group_Product } = req.body;
  const new__Group_Product = {
    name__Group_Product,
  };

  const updated__Group_Product = await Model__Group_Product.findByIdAndUpdate(
    req.params.id,
    new__Group_Product,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Group_Product,
  });
});

//@desc   Get all __Group_Products
//@route  GET /api/reference-data/group-product
//@access Private
exports.getAll__Group_Products = asyncHandler(async (req, res, next) => {
  const all__Group_Products = await Model__Group_Product.find().sort({
    name__Group_Product: 1,
  });
  //Check if  exists response
  if (!all__Group_Products) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Group_Products,
  });
});

//@desc   Get one __Group_Product
//@route  GET /api/reference-data/group-product/:id
//@access Private
exports.getOne__Group_Product = asyncHandler(async (req, res, next) => {
  const one__Group_Product = await Model__Group_Product.findById(req.params.id);
  //Check if  exists response
  if (!one__Group_Product) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Group_Product,
  });
});

//@desc   DELETE one __Group_Product
//@route  DELETE /api/reference-data/group-product/:id
//@access Private
exports.delete__Group_Product = asyncHandler(async (req, res, next) => {
  const one__Group_Product = await Model__Group_Product.findByIdAndDelete(
    req.params.id
  );
  const related__Product = await Model__Product.findOne({
    group_Product: req.params.id,
  });

  if (related__Product) {
    return next(
      new ErrorResponse(
        'не возможно удалить этот елемент, есть связанные элементы',
        403
      )
    );
  } else {
    //Check if  exists response
    if (!one__Group_Product) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  }
});
