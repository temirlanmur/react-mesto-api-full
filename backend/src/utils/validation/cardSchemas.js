const { Joi } = require('celebrate');
const { cardSchemaConstants } = require('../../models/cardModel');

const cardSchemas = {
  name: Joi.string()
    .min(cardSchemaConstants.nameMinLength)
    .max(cardSchemaConstants.nameMaxLength),
};

module.exports = cardSchemas;
