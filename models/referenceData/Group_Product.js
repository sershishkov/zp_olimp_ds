const mongoose = require('mongoose');

const Group_Product__Schema = new mongoose.Schema({
  name__Group_Product: {
    type: String,
    required: [true, 'Введите группу товара'],
    unique: true,
  },
});

module.exports = mongoose.model('Group_Product', Group_Product__Schema);
