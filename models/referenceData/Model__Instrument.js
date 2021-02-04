const mongoose = require('mongoose');

const Model__Instrument = new mongoose.Schema({
  name__Instrument: {
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

module.exports = mongoose.model('Instrument', Model__Instrument);
