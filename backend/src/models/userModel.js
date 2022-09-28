const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errors');

const userSchemaConstants = {
  nameMinLength: 2,
  nameMaxLength: 30,
  aboutMinLength: 2,
  aboutMaxLength: 30,
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} не является валидным email`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: userSchemaConstants.nameMinLength,
    maxlength: userSchemaConstants.nameMaxLength,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: userSchemaConstants.aboutMinLength,
    maxlength: userSchemaConstants.aboutMaxLength,
  },
  avatar: {
    type: String,
    validate: {
      validator: (value) => {
        const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*)/;
        return urlRegex.test(value);
      },
      message: (props) => `${props.value} не является валидным url адресом`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

const User = mongoose.model('user', userSchema);

module.exports = { User, userSchemaConstants };
