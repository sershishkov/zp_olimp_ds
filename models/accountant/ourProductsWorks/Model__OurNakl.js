const mongoose = require('mongoose');

const Model__OurNakl = new mongoose.Schema({
  naklNumber: {
    type: String,
    required: [true, 'Введите номер накладной'],
    unique: true,
  },
  naclDate: {
    type: Date,
    // required: [true, 'Введите дату накладной'],
    default: Date.now,
  },
  contract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract',
    required: [true, 'Выберите номер договора'],
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
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Выберите товар'],
      },
      amount: {
        type: Number,
        required: [true, 'Введите количество'],
      },
      enteredPrice: {
        type: Number,
        required: [true, 'Введите закупочную цену товара'],
      },
      sellingPrice: {
        type: Number,
        required: [true, 'Введите продажную цену товара'],
      },
    },
  ],
  formOfPayment: {
    type: String,
    enum: ['форма1', 'форма2'],
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

module.exports = mongoose.model('OurNakl', Model__OurNakl);
