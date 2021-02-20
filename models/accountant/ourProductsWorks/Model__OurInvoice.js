const mongoose = require('mongoose');

const Model__OurInvoice = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: [true, 'Введите номер счета'],
    unique: true,
  },
  invoiceDate: {
    type: Date,
    required: [true, 'Введите дату счета'],
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
  serviceJobs: [
    {
      serviceJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceJob',
        required: [true, 'Выберите работу'],
      },
      description: {
        type: String,
      },
      amount: {
        type: Number,
        required: [true, 'Введите количество'],
      },
      employeePrice: {
        type: Number,
        required: [true, 'Введите  цену работникам'],
      },
      sellingPrice: {
        type: Number,
        required: [true, 'Введите продажную цену работ'],
      },
    },
  ],
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
    },
  ],
  purpose_of_payment: {
    type: String,
    required: [true, 'Необходимо назначение платежа'],
  },
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
});

module.exports = mongoose.model('OurInvoice', Model__OurInvoice);
