const mongoose = require('mongoose');

const Model__Type_Firm = new mongoose.Schema({
  name__Type_Firm: {
    type: String,
    required: [true, 'Введите полное название формы собственности предприятия'],
    unique: true,
  },

  short_name__Type_Firm: {
    type: String,
    required: [
      true,
      'Введите сокращенное название формы собственности предприятия',
    ],
  },
});

module.exports = mongoose.model('Type_Firm', Model__Type_Firm);
