const { Joi } = require('celebrate');

const commonSchemas = {
  id: Joi.string().hex().length(24).required(),
  url: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*)/),
};

module.exports = commonSchemas;
