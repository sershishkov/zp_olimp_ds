const mongoose = require('mongoose');

const ServiceJob__Schema = new mongoose.Schema({
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
});

module.exports = mongoose.model('ServiceJob', ServiceJob__Schema);
