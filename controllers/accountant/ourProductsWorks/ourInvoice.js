const ErrorResponse = require('../../../utils/errorResponse');
const asyncHandler = require('../../../middleware/async');
const Model__OurInvoice = require('../../../models/accountant/ourProductsWorks/Model__OurInvoice');

//@desc   Add a __OurInvoice
//@route  POST /api/accountant/our-products-works/our-invoice
//@access Private
exports.add__OurInvoice = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const userId = req.user.id;
  const {
    invoiceNumber,
    invoiceDate,
    contract,
    ourFirm,
    client,
    serviceJobs,
    products,
    purpose_of_payment,
    formOfPayment,
    active,
  } = req.body;
  const new__OurInvoice = new Model__OurInvoice({
    invoiceNumber,
    invoiceDate,
    contract,
    ourFirm,
    client,
    serviceJobs,
    products,
    purpose_of_payment,
    formOfPayment,
    active,
    creator: userId,
  });

  await new__OurInvoice.save();

  res.status(200).json({
    success: true,
    data: new__OurInvoice,
  });
});

//@desc   Update a __OurInvoice
//@route  PUT /api/accountant/our-products-works/our-invoice/:id
//@access Private
exports.update__OurInvoice = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    invoiceNumber,
    invoiceDate,
    contract,
    ourFirm,
    client,
    serviceJobs,
    products,
    purpose_of_payment,
    formOfPayment,
    active,
  } = req.body;

  const updated__OurInvoice = await Model__OurInvoice.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        invoiceNumber,
        invoiceDate,
        contract,
        ourFirm,
        client,
        serviceJobs,
        products,
        purpose_of_payment,
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
    data: updated__OurInvoice,
  });
});

//@desc   Get all __OurInvoices
//@route  GET /api/accountant/our-products-works/our-invoice
//@access Private
exports.getAll__OurInvoices = asyncHandler(async (req, res, next) => {
  // console.log(query);
  const all__OurInvoices = await Model__OurInvoice.find(req.query)
    .populate({ path: 'contract', select: 'number__Contract date_Contract ' })
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })
    .populate({
      path: 'serviceJobs.serviceJob',
      select: 'name__ServiceJob',
    })
    .populate({
      path: 'products.product',
      select: 'name__Product',
    })
    .sort({
      invoiceDate: -1,
    });
  //Check if  exists response
  if (!all__OurInvoices) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__OurInvoices,
  });
});

//@desc   Get one __OurInvoice
//@route  GET /api/accountant/our-products-works/our-invoice/:id
//@access Private
exports.getOne__OurInvoice = asyncHandler(async (req, res, next) => {
  const one__OurInvoice = await Model__OurInvoice.findById(req.params.id)
    .populate({ path: 'contract', select: 'number__Contract date_Contract ' })
    .populate({ path: 'ourFirm', select: 'name__Firm' })
    .populate({ path: 'client', select: 'name__Firm' })
    .populate({
      path: 'serviceJobs.serviceJob',
      select: 'name__ServiceJob',
    })
    .populate({
      path: 'products.product',
      select: 'name__Product',
    });
  //Check if  exists response
  if (!one__OurInvoice) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__OurInvoice,
  });
});

//@desc   DELETE one __OurInvoice
//@route  DELETE /api/accountant/our-products-works/our-invoice/:id
//@access Private
exports.delete__OurInvoice = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'accountant') {
    const one__OurInvoice = await Model__OurInvoice.findByIdAndDelete(
      req.params.id
    );

    //Check if  exists response
    if (!one__OurInvoice) {
      return next(new ErrorResponse('Нет  объекта с данным id', 400));
    }
  } else {
    await Model__OurInvoice.findByIdAndUpdate(
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
