const mongoose = require('mongoose');

const Instrument__Schema = new mongoose.Schema({
  name__Instrument: {
    type: String,
    required: [true, 'Введите название Инструмента'],
    unique: true,
  },
});

module.exports = mongoose.model('Instrument', Instrument__Schema);
