const mongoose = require('mongoose');

const Worker__Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя? '],
  },
  middleName: {
    type: String,
    // required: [true, 'Отчество? '],
  },
  surname: {
    type: String,
    required: [true, 'Фамилия? '],
  },
  dateOf_Birth: {
    type: Date,
  },
  postCode: {
    type: String,
    match: [/\b\d{5}\b/, 'Пожалуйста введите 5 цифр'],
  },
  address: {
    type: String,
  },
  individualTaxNumber: {
    type: String,
    match: [/\b\d{10}\b/, 'Пожалуйста введите 10 цифр'],
  },
  phoneNumber: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Worker', Worker__Schema);
