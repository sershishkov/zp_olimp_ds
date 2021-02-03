const mongoose = require('mongoose');

const Model__Expense = new mongoose.Schema({
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

module.exports = mongoose.model('Expense', Model__Expense);
