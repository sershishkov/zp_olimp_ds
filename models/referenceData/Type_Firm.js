const mongoose = require('mongoose');

const Type_Firm__Schema = new mongoose.Schema({
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
    unique: true,
  },
});

module.exports = mongoose.model('Type_Firm', Type_Firm__Schema);
