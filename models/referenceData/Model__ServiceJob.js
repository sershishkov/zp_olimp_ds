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

  inventars: [
    {
      inventar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventar',
      },
    },
  ],
  instruments: [
    {
      instrument: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instrument',
      },
    },
  ],
  equipments: [
    {
      equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
      },
    },
  ],
});

module.exports = mongoose.model('ServiceJob', Model__ServiceJob);
