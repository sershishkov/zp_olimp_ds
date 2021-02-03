const mongoose = require('mongoose');

const Model__Group_ServiceJob = new mongoose.Schema({
  name__Group_ServiceJob: {
    type: String,
    required: [true, 'Введите группу видов работ'],
    unique: true,
  },
});

module.exports = mongoose.model('Group_ServiceJob', Model__Group_ServiceJob);
