const mongoose = require('mongoose');

const Model__Group_of__MenuLink = new mongoose.Schema({
  name__Group_MenuLink: {
    type: String,
    required: [true, 'Пожалуйста добавьте группу меню ссылок'],
    unique: true,
  },
  allowedRoles: {
    type: [String],
    required: [true, 'Пожалуйста добавьте роль'],
  },
});

module.exports = mongoose.model(
  'Group_of__MenuLink',
  Model__Group_of__MenuLink
);
