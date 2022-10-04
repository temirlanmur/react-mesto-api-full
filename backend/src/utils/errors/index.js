const HttpError = require('./HttpError');
const BadRequestError = require('./BadRequestError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflicError');
const InternalServerError = require('./InternalServerError');

module.exports = {
  HttpError,

  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,

  InternalServerError,
};
