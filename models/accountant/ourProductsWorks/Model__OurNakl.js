const mongoose = require('mongoose');

const Model__OurNakl = new mongoose.Schema(
  {
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
        description: {
          type: String,
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
        row__Sum: {
          type: Number,
          required: [true, 'Введите продажную цену товара'],
        },
      },
    ],
    // sum__Product: {
    //   type: Number,
    //   required: [true, 'Введите сумму накладной'],
    // },
    formOfPayment: {
      type: String,
      enum: ['форма1', 'форма2'],
      default: 'форма1',
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Model__OurNakl.virtual('sum__Product').get(function () {
  let total_sum__Product = 0;
  this.products.forEach((item) => {
    total_sum__Product += item.amount * item.sellingPrice;
  });
  return total_sum__Product.toFixed(2);
});

module.exports = mongoose.model('OurNakl', Model__OurNakl);
