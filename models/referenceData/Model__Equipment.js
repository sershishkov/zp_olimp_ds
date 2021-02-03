const mongoose = require('mongoose');

const Model__Equipment = new mongoose.Schema({
  name__Equipment: {
    type: String,
    required: [true, 'Введите название Инструмента'],
    unique: true,
  },
});

module.exports = mongoose.model('Equipment', Model__Equipment);
