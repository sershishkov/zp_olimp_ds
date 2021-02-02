const mongoose = require('mongoose');

const Expense__Schema = new mongoose.Schema({
  name__Expense: {
    type: String,
    required: [true, 'Введите расход'],
    unique: true,
  },
  group_Expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group_Expense',
  },
});

module.exports = mongoose.model('Expense', Expense__Schema);
