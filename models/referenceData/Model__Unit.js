const mongoose = require('mongoose');

const Model__Unit = new mongoose.Schema({
  name__Unit: {
    type: String,
    required: [true, 'Введите сокращенное название единицы измерения'],
    unique: true,
  },
});

module.exports = mongoose.model('Unit', Model__Unit);
