const mongoose = require('mongoose');

const Model__Instrument = new mongoose.Schema({
  name__Instrument: {
    type: String,
    required: [true, 'Введите название Инструмента'],
    unique: true,
  },
});

module.exports = mongoose.model('Instrument', Model__Instrument);
