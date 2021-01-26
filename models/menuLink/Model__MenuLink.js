const mongoose = require('mongoose');

const Model__MenuLink = new mongoose.Schema({
  name__MenuLink: {
    type: String,
    required: [true, 'Пожалуйста добавьте название ссылки'],
    unique: true,
  },
  linkToPage: {
    type: String,
    required: [true, 'Пожалуйста добавьте ссылку'],
    unique: true,
  },
  allowedRoles: {
    type: [String],
    required: [true, 'Пожалуйста добавьте роль'],
  },
  group_Of_Page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group_of__MenuLink',
  },
});

module.exports = mongoose.model('MenuLink', Model__MenuLink);
