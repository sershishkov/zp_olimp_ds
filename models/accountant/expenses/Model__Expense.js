const mongoose = require('mongoose');

const Model__Expense = new mongoose.Schema({
  name__Expense: {
    type: String,
    required: [true, 'Введите расход'],
  },
  group_Expense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group_Expense',
  },
  sum: {
    type: Number,
    required: [true, 'Введите сумму'],
  },
  recipient: {
    type: String,
    required: [true, 'Введите получателя'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Expense', Model__Expense);
