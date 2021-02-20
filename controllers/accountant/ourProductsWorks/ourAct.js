const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Model__OurAct = require('../../../models/accountant/ourProductsWorks/Model__OurAct');

//@desc   Add a __OurAct
//@route  POST /api/accountant/our-products-works/our-act
//@access Private
exports.add__OurAct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const userId = req.user.id;
  const {
    actNumber,
    actDate,
    contract,
    ourFirm,
    client,
    serviceJobs,
    formOfPayment,
    active,
  } = req.body;
  const new__OurAct = new Model__OurAct({
    actNumber,
    actDate,
    contract,
    ourFirm,
    client,
    serviceJobs,
    formOfPayment,
    active,
    creator: userId,
  });

  await new__OurAct.save();

  res.status(200).json({
    success: true,
    data: new__OurAct,
  });
});

//@desc   Update a __OurAct
//@route  PUT /api/accountant/our-products-works/our-act/:id
//@access Private
exports.update__OurAct = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    actNumber,
    actDate,
    contract,
    ourFirm,
    client,
    serviceJobs,
    formOfPayment,
    active,
  } = req.body;

  const updated__OurAct = await Model__OurAct.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        actNumber,
        actDate,
        contract,
        ourFirm,
        client,
        serviceJobs,
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
    data: updated__OurAct,
  });
});

//@desc   Get all __OurActs
//@route  GET /api/accountant/our-products-works/our-act
//@access Private
exports.getAll__OurActs = asyncHandler(async (req, res, next) => {
  const all__OurActs = await Model__OurAct.find(req.query)
    .populate({ path: 'contract', select: 'number__Contract date_Contract ' })
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })
    .populate({
      path: 'serviceJobs.serviceJob',
      select: 'name__ServiceJob',
    })

    .sort({
      invoiceDate: -1,
    });
  //Check if  exists response
  if (!all__OurActs) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__OurActs,
  });
});

//@desc   Get one __OurAct
//@route  GET /api/accountant/our-products-works/our-act/:id
//@access Private
exports.getOne__OurAct = asyncHandler(async (req, res, next) => {
  const one__OurAct = await Model__OurAct.findById(req.params.id)
    .populate({ path: 'contract', select: 'number__Contract date_Contract ' })
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })
    .populate({
      path: 'serviceJobs.serviceJob',
      select: 'name__ServiceJob',
    });
  //Check if  exists response
  if (!one__OurAct) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__OurAct,
  });
});

//@desc   DELETE one __OurAct
//@route  DELETE /api/accountant/our-products-works/our-act/:id
//@access Private
exports.delete__OurAct = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'accountant') {
    const one__OurAct = await Model__OurAct.findByIdAndDelete(req.params.id);

    //Check if  exists response
    if (!one__OurAct) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }
  } else {
    await Model__OurAct.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          active: false,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
