const mongoose = require('mongoose');

const Group_Expense__Schema = new mongoose.Schema({
  name__Group_Expense: {
    type: String,
    required: [true, 'Введите группу расходов'],
    unique: true,
  },
});

module.exports = mongoose.model('Group_Expense', Group_Expense__Schema);
