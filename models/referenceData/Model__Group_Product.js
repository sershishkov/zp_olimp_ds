const mongoose = require('mongoose');

const Model__Group_Product = new mongoose.Schema({
  name__Group_Product: {
    type: String,
    required: [true, 'Введите группу товара'],
    unique: true,
  },
});

module.exports = mongoose.model('Group_Product', Model__Group_Product);
