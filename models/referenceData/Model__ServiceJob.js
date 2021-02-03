const mongoose = require('mongoose');

const Model__ServiceJob = new mongoose.Schema({
  name__serviceJob: {
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
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
  },
  inventars: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Inventar',
  },
  instruments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Instrument',
  },
  equipments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Equipment',
  },
});

module.exports = mongoose.model('ServiceJob', Model__ServiceJob);
