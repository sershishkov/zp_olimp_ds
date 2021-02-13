const mongoose = require('mongoose');

const Model__ServiceJob = new mongoose.Schema({
  name__ServiceJob: {
    type: String,
    required: [true, 'Введите название '],
    unique: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
  },
  group_ServiceJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group_ServiceJob',
  },

  employeePrice: {
    type: Number,
    required: [true, 'Введите цену'],
  },
  sellingPrice: {
    type: Number,
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
});

module.exports = mongoose.model('ServiceJob', Model__ServiceJob);
