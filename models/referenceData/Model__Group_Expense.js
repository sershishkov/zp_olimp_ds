const mongoose = require('mongoose');

const Model__Group_Expense = new mongoose.Schema({
  name__Group_Expense: {
    type: String,
    required: [true, 'Введите группу расходов'],
    unique: true,
  },
});

module.exports = mongoose.model('Group_Expense', Model__Group_Expense);
