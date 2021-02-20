const mongoose = require('mongoose');

const Model__OurAct = new mongoose.Schema(
  {
    actNumber: {
      type: String,
      required: [true, 'Введите номер накладной'],
      unique: true,
    },
    actDate: {
      type: Date,
      // required: [true, 'Введите дату накладной'],
      // default: Date.now,
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
    // sum__ServiceJob: {
    //   type: Number,
    //   required: [true, 'Введите сумму работ'],
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

Model__OurAct.virtual('sum__ServiceJob').get(function () {
  let total_sum__ServiceJob = 0;
  this.serviceJobs.forEach((item) => {
    total_sum__ServiceJob += item.amount * item.sellingPrice;
  });
  return total_sum__ServiceJob.toFixed(2);
});

module.exports = mongoose.model('OurAct', Model__OurAct);
