const mongoose = require('mongoose');

const Inventar__Schema = new mongoose.Schema({
  name__Inventar: {
    type: String,
    required: [true, 'Введите название инвентаря'],
    unique: true,
  },
});

module.exports = mongoose.model('Inventar', Inventar__Schema);
