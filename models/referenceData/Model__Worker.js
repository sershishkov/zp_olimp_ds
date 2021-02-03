const mongoose = require('mongoose');

const Worker__Schema = new mongoose.Schema({
  name__Worker: {
    type: String,
  },
  middleName: {
    type: String,
  },
  surname: {
    type: String,
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
