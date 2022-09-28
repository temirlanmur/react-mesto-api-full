const HttpError = require('./HttpError');

class ConflictError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
