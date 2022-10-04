const HttpError = require('./HttpError');

class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
