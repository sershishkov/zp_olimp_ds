const mongoose = require('mongoose');

const Group_ServiceJob__Schema = new mongoose.Schema({
  name__Group_ServiceJob: {
    type: String,
    required: [true, 'Введите группу видов работ'],
    unique: true,
  },
});

module.exports = mongoose.model('Group_ServiceJob', Group_ServiceJob__Schema);
