const mongoose = require('mongoose');

const Unit__Schema = new mongoose.Schema({
  name__Unit: {
    type: String,
    required: [true, 'Введите сокращенное название единицы измерения'],
    unique: true,
  },
});

module.exports = mongoose.model('Unit', Unit__Schema);
