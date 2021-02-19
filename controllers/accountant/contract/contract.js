const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Model__Contract = require('../../../models/accountant/contract/Model__Contract');

//@desc   Add a __Contract
//@route  POST /api/accountant/contract
//@access Private
exports.add__Contract = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const userId = req.user.id;

  const {
    number__Contract,
    date_Contract,
    type_Contract,
    typesOf_WorkInTheContract,
    sum,
    ourFirm,
    client,
    active,
  } = req.body;
  const new__Contract = new Model__Contract({
    number__Contract,
    date_Contract,
    type_Contract,
    typesOf_WorkInTheContract,
    sum,
    ourFirm,
    client,
    active,
    creator: userId,
  });

  await new__Contract.save();

  res.status(200).json({
    success: true,
    data: new__Contract,
  });
});

//@desc   Update a __Contract
//@route  PUT /api/accountant/contract/:id
//@access Private
exports.update__Contract = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    number__Contract,
    date_Contract,
    type_Contract,
    typesOf_WorkInTheContract,
    sum,
    ourFirm,
    client,
    active,
  } = req.body;

  const updated__Contract = await Model__Contract.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        number__Contract,
        date_Contract,
        type_Contract,
        typesOf_WorkInTheContract,
        sum,
        ourFirm,
        client,
        active: active ? active : true,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Contract,
  });
});

//@desc   Get all __Contracts
//@route  GET /api/accountant/contract
//@access Private
exports.getAll__Contracts = asyncHandler(async (req, res, next) => {
  const all__Contracts = await Model__Contract.find()
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })

    .sort({
      date_Contract: -1,
    });
  //Check if  exists response
  if (!all__Contracts) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Contracts,
  });
});

//@desc   Get one __Contract
//@route  GET /api/accountant/contract/:id
//@access Private
exports.getOne__Contract = asyncHandler(async (req, res, next) => {
  const one__Contract = await Model__Contract.findById(req.params.id)
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' });
  //Check if  exists response
  if (!one__Contract) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Contract,
  });
});

//@desc   DELETE one __Contract
//@route  DELETE /api/accountant/contract/:id
//@access Private
exports.delete__Contract = asyncHandler(async (req, res, next) => {
  const one__Contract = await Model__Contract.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__Contract) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
