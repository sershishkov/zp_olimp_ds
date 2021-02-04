const mongoose = require('mongoose');

const Model__Inventar = new mongoose.Schema({
  name__Inventar: {
    type: String,
    required: [true, 'Введите название инвентаря'],
    unique: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'Введите единицы измерения'],
  },
});

module.exports = mongoose.model('Inventar', Model__Inventar);
