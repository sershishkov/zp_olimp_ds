const mongoose = require('mongoose');

const Model__Equipment = new mongoose.Schema({
  name__Equipment: {
    type: String,
    required: [true, 'Введите название Инструмента'],
    unique: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'Введите единицы измерения'],
  },
});

module.exports = mongoose.model('Equipment', Model__Equipment);
