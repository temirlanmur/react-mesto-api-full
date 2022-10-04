const { Joi } = require('celebrate');
const { userSchemaConstants } = require('../../models/userModel');

const userSchemas = {
  name: Joi.string()
    .min(userSchemaConstants.nameMinLength)
    .max(userSchemaConstants.nameMaxLength),
  about: Joi.string()
    .min(userSchemaConstants.aboutMinLength)
    .max(userSchemaConstants.aboutMaxLength),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

module.exports = userSchemas;
