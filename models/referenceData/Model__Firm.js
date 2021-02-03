const mongoose = require('mongoose');

const Model__Firm = new mongoose.Schema({
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
    required: [true, 'Введите  IBAN '],
  },
  ibanGazBank: {
    type: String,
  },

  firstPerson__Position: {
    type: String,
  },
  firstPerson__Position_RoditelPadej: {
    type: String,
  },

  firstPerson__Full_Name: {
    type: String,
    required: [true, 'Фамилия Имя Отчество? '],
  },
  firstPerson__Full_Name_RoditelPadej: {
    type: String,
    required: [true, 'Фамилия Имя Отчество? в родительном падеже '],
  },

  firstPerson__Short_Name: {
    type: String,
    required: [true, 'Введите Сокращенное ФИО '],
  },
  whichActsOnTheBasis: {
    type: String,
  },

  issuedBy: {
    type: String,
  },
  taxPayerOn: {
    type: String,
  },
  certificate_PDV: {
    type: String,
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

module.exports = mongoose.model('Firm', Model__Firm);
