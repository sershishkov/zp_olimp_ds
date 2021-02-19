const mongoose = require('mongoose');

const Model__Contract = new mongoose.Schema({
  number__Contract: {
    type: String,
    unique: true,
    required: [true, 'Введите номер договора'],
  },
  date_Contract: {
    type: Date,
    required: [true, 'Введите дату договора'],
  },
  type_Contract: {
    type: String,
    enum: ['Общий', 'Сумма', 'Предоплата', 'Частичная предоплата'],
  },
  typesOf_WorkInTheContract: {
    type: String,
    required: [true, 'Введите виды работ договора'],
  },
  sum: {
    type: Number,
  },
  ourFirm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm',
    required: [true, 'Выберите фирму Исполнителя'],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm',
    required: [true, 'Выберите фирму Заказчика'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contract', Model__Contract);
