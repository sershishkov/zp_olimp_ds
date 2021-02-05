const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const Model__Firm = require('../../models/referenceData/Model__Firm');

//@desc   Add a __Firm
//@route  POST /api/reference-data/firm
//@access Private
exports.add__Firm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  } = req.body;
  const new__Firm = new Model__Firm({
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  });

  await new__Firm.save();

  res.status(200).json({
    success: true,
    data: new__Firm,
  });
});

//@desc   Update a __Firm
//@route  PUT /api/reference-data/firm/:id
//@access Private
exports.update__Firm = asyncHandler(async (req, res, next) => {
  //Check if  exists something in body
  if (!req.body) {
    return next(new ErrorResponse('Не переданы значения', 400));
  }
  const {
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  } = req.body;
  const new__Firm = {
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  };

  const updated__Firm = await Model__Firm.findByIdAndUpdate(
    req.params.id,
    new__Firm,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updated__Firm,
  });
});

//@desc   Get all __Firms
//@route  GET /api/reference-data/firm
//@access Private
exports.getAll__Firms = asyncHandler(async (req, res, next) => {
  const all__Firms = await Model__Firm.find()
    .populate({
      path: 'type_Firm',
      select: 'name__Type_Firm short_name__Type_Firm',
    })
    .sort({
      name__Firm: 1,
    });
  //Check if  exists response
  if (!all__Firms) {
    return next(new ErrorResponse('На данный момент ничего в базе нет ', 400));
  }

  res.status(200).json({
    success: true,
    data: all__Firms,
  });
});

//@desc   Get one __Firm
//@route  GET /api/reference-data/firm/:id
//@access Private
exports.getOne__Firm = asyncHandler(async (req, res, next) => {
  const one__Firm = await Model__Firm.findById(req.params.id).populate({
    path: 'type_Firm',
    select: 'name__Type_Firm short_name__Type_Firm',
  });
  //Check if  exists response
  if (!one__Firm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: one__Firm,
  });
});

//@desc   DELETE one __Firm
//@route  DELETE /api/reference-data/firm/:id
//@access Private
exports.delete__Firm = asyncHandler(async (req, res, next) => {
  const one__Firm = await Model__Firm.findByIdAndDelete(req.params.id);

  //Check if  exists response
  if (!one__Firm) {
    return next(new ErrorResponse('Нет  объекта с данным id', 400));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
