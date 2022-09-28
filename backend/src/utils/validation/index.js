const cardSchemas = require('./cardSchemas');
const userSchemas = require('./userSchemas');
const commonSchemas = require('./commonSchemas');

// Defines some model schemas for Joi validation
// See: https://joi.dev/ & https://github.com/arb/celebrate
module.exports = {
  cardSchemas,
  userSchemas,
  commonSchemas,
};
