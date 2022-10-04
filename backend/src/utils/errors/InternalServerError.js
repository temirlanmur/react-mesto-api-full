const HttpError = require('./HttpError');

class InternalServerError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
