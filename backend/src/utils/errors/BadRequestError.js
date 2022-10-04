const HttpError = require('./HttpError');

class BadRequestError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
