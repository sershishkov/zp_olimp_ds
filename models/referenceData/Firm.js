const mongoose = require('mongoose');

const Firm__Schema = new mongoose.Schema({
  name__Firm: {
    type: String,
    required: [true, 'Введите  название фирмы'],
    unique: true,
  },
  short_name__Firm: {
    type: String,
  },
  type_Firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type_Firm',
    required: [true, 'Необходимо выбрать форму собственности '],
  },
  postCode: {
    type: String,
    required: [true, 'Введите почтовый индекс '],
    match: [/\b\d{5}\b/, 'Пожалуйста введите 5 цифр'],
  },
  address: {
    type: String,
    required: [true, 'Введите адрес фирмы '],
  },

  EDRPOU: {
    type: String,
    required: [true, 'Введите корректный ЄДРПОУ '],
    match: [/\b\d{8,10}\b/, 'Пожалуйста введите 8 или 10 цифр'],
  },
  ibanOwn: {
    type: String,
    required: [true, 'Введите корректный IBAN '],
    match: [/\b\d{27}\b/, 'Пожалуйста введите 27 цифр'],
  },

  ibanGazBank: {
    type: String,
    match: [/\b\d{27}\b/, 'Пожалуйста введите 27 цифр'],
  },

  firstPersonPosition: {
    type: String,
  },
  firstPersonPositionRoditelPadej: {
    type: String,
  },
  firstPersonSurname: {
    type: String,
    required: [true, 'Фамилия? '],
  },
  firstPersonName: {
    type: String,
    required: [true, 'Имя? '],
  },
  firstPersonMiddleName: {
    type: String,
    required: [true, 'Отчество? '],
  },

  firstPersonSurnameRoditelPadej: {
    type: String,
    required: [true, 'Впишите фамилию в родительном падеже '],
  },
  firstPersonNameRoditelPadej: {
    type: String,
    required: [true, 'Впишите имя в родительном падеже '],
  },
  firstPersonMiddleNameRoditelPadej: {
    type: String,
    required: [true, 'Впишите отчество в родительном падеже '],
  },

  shortName: {
    type: String,
    required: [true, 'Введите Сокращенное ФИО '],
  },
  actsOnBasisOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_ActsOnBasisOf',
  },
  actsOnBasisOf_Number: {
    type: String,
  },
  issuedBy: {
    type: String,
  },
  taxPayerOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypeOf_TaxPayerOn',
  },
  email: {
    type: String,
    required: [true, 'Введите email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста введите корректный email',
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Введите номер телефона'],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Firm', Firm__Schema);
