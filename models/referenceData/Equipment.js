const mongoose = require('mongoose');

const Equipment__Schema = new mongoose.Schema({
  name__Equipment: {
    type: String,
    required: [true, 'Введите название Инструмента'],
    unique: true,
  },
});

module.exports = mongoose.model('Equipment', Equipment__Schema);
