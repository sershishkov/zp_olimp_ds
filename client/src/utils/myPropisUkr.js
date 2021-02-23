const mapNumbers = {
  0: [2, 1, 'нуль'],
  1: [0, 2, 'один', 'одна'],
  2: [1, 2, 'два', 'дві'],
  3: [1, 1, 'три'],
  4: [1, 1, 'чотири'],
  5: [2, 1, "п'ять"],
  6: [2, 1, 'шість'],
  7: [2, 1, 'сім'],
  8: [2, 1, 'вісім'],
  9: [2, 1, "дев'ять"],
  10: [2, 1, 'десять'],
  11: [2, 1, 'одинадцять'],
  12: [2, 1, 'дванадцять'],
  13: [2, 1, 'тринадцять'],
  14: [2, 1, 'чотирнадцять'],
  15: [2, 1, "п'ятнадцять"],
  16: [2, 1, 'шістнадцять'],
  17: [2, 1, 'сімнадцять'],
  18: [2, 1, 'вісімнадцять'],
  19: [2, 1, "дев'ятнадцять"],
  20: [2, 1, 'двадцять'],
  30: [2, 1, 'тридцять'],
  40: [2, 1, 'сорок'],
  50: [2, 1, "п'ятдесят"],
  60: [2, 1, 'шістдесят'],
  70: [2, 1, 'сімдесят'],
  80: [2, 1, 'вісімдесят'],
  90: [2, 1, "дев'яносто"],
  100: [2, 1, 'сто'],
  200: [2, 1, 'двісті'],
  300: [2, 1, 'триста'],
  400: [2, 1, 'чотириста'],
  500: [2, 1, "п'ятсот"],
  600: [2, 1, 'шістсот'],
  700: [2, 1, 'сімсот'],
  800: [2, 1, 'вісімсот'],
  900: [2, 1, "дев'ятсот"],
};

var mapOrders = [
  {
    _Gender: false,
    _arrStates: ['гривня', 'гривні', 'гривень'],
    _bAddZeroWord: true,
  },
  { _Gender: false, _arrStates: ['тисяча', 'тисячі', 'тисяч'] },
  { _Gender: true, _arrStates: ['мільйон', 'мільйона', 'мільйонів'] },
  { _Gender: true, _arrStates: ['мільярд', 'мільярда', 'мільярдів'] },
  { _Gender: true, _arrStates: ['триліон', 'триліона', 'триліонів'] },
];

var objKop = { _Gender: false, _arrStates: ['копійка', 'копійки', 'копійок'] };

function Value(dVal, bGender) {
  var xVal = mapNumbers[dVal];
  if (xVal[1] === 1) {
    return xVal[2];
  } else {
    return xVal[2 + (bGender ? 0 : 1)];
  }
}

function From0To999(fValue, oObjDesc, fnAddNum, fnAddDesc) {
  var nCurrState = 2;
  if (Math.floor(fValue / 100) > 0) {
    var fCurr = Math.floor(fValue / 100) * 100;
    fnAddNum(Value(fCurr, oObjDesc._Gender));
    nCurrState = mapNumbers[fCurr][0];
    fValue -= fCurr;
  }

  if (fValue < 20) {
    if (Math.floor(fValue) > 0 || oObjDesc._bAddZeroWord) {
      fnAddNum(Value(fValue, oObjDesc._Gender));
      nCurrState = mapNumbers[fValue][0];
    }
  } else {
    // var
    fCurr = Math.floor(fValue / 10) * 10;
    fnAddNum(Value(fCurr, oObjDesc._Gender));
    nCurrState = mapNumbers[fCurr][0];
    fValue -= fCurr;

    if (Math.floor(fValue) > 0) {
      fnAddNum(Value(fValue, oObjDesc._Gender));
      nCurrState = mapNumbers[fValue][0];
    }
  }

  fnAddDesc(oObjDesc._arrStates[nCurrState]);
}

export function FloatToSamplesInWordsUkr(fAmount) {
  var fInt = Math.floor(fAmount + 0.005);
  var fDec = Math.floor((fAmount - fInt) * 100 + 0.5);

  var arrRet = [];
  // var iOrder = 0;
  var arrSouthands = [];
  for (; fInt > 0.9999; fInt /= 1000) {
    arrSouthands.push(Math.floor(fInt % 1000));
  }
  if (arrSouthands.length === 0) {
    arrSouthands.push(0);
  }

  function PushToRes(strVal) {
    arrRet.push(strVal);
  }
  for (var iSouth = arrSouthands.length - 1; iSouth >= 0; --iSouth) {
    From0To999(arrSouthands[iSouth], mapOrders[iSouth], PushToRes, PushToRes);
  }

  if (arrRet.length > 0) {
    // Capitalize first letter
    arrRet[0] =
      arrRet[0].match(/^(.)/)[1].toLocaleUpperCase() +
      arrRet[0].match(/^.(.*)$/)[1];
  }

  arrRet.push(fDec < 10 ? '0' + fDec : '' + fDec);
  From0To999(fDec, objKop, function () {}, PushToRes);

  return arrRet.join(' ');
}

// console.log(FloatToSamplesInWordsUkr(9993594123.82));
