const mongoose = require('mongoose');

const Model__Inventar = new mongoose.Schema({
  name__Inventar: {
    type: String,
    required: [true, 'Введите название инвентаря'],
    unique: true,
  },
});

module.exports = mongoose.model('Inventar', Model__Inventar);
