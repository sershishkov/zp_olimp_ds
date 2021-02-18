const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Model__OurNakl = require('../../../models/accountant/ourProductsWorks/Model__OurNakl');

//@desc   Add a __OurNakl
//@route  POST /api/accountant/our-products-works/our-nakl
//@access Private
exports.add__OurNakl = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const userId = req.user.id;
  const {
    naklNumber,
    naclDate,
    ourFirm,
    client,
    products,
    formOfPayment,
    active,
  } = req.body;
  const new__OurNakl = new Model__OurNakl({
    naklNumber,
    naclDate,
    ourFirm,
    client,
    products,
    formOfPayment,
    active,
    creator: userId,
  });

  await new__OurNakl.save();

  res.status(200).json({
    success: true,
    data: new__OurNakl,
  });
});

//@desc   Update a __OurNakl
//@route  PUT /api/accountant/our-products-works/our-nakl/:id
//@access Private
exports.update__OurNakl = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    naklNumber,
    naclDate,
    ourFirm,
    client,
    products,
    formOfPayment,
    active,
    // creator,
  } = req.body;

  const updated__OurNakl = await Model__OurNakl.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        naklNumber,
        naclDate,
        ourFirm,
        client,
        products,
        formOfPayment,
        active,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__OurNakl,
  });
});

//@desc   Get all __OurNakls
//@route  GET /api/accountant/our-products-works/our-nakl
//@access Private
exports.getAll__OurNakls = asyncHandler(async (req, res, next) => {
  const all__OurNakls = await Model__OurNakl.find()
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })
    .populate({
      path: 'products.product',
      select: 'name__Product',
    })
    .sort({
      naclDate: -1,
    });
  //Check if  exists response
  if (!all__OurNakls) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__OurNakls,
  });
});

//@desc   Get one __OurNakl
//@route  GET /api/accountant/our-products-works/our-nakl/:id
//@access Private
exports.getOne__OurNakl = asyncHandler(async (req, res, next) => {
  const one__OurNakl = await Model__OurNakl.findById(req.params.id)
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })
    .populate({
      path: 'products.product',
      select: 'name__Product',
    });
  //Check if  exists response
  if (!one__OurNakl) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__OurNakl,
  });
});

//@desc   DELETE one __OurNakl
//@route  DELETE /api/accountant/our-products-works/our-nakl/:id
//@access Private
exports.delete__OurNakl = asyncHandler(async (req, res, next) => {
  const one__OurNakl = await Model__OurNakl.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__OurNakl) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
