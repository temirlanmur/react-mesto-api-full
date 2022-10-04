const { isCelebrateError } = require('celebrate');
const { HttpError } = require('../utils/errors');
const { ErrorAPIModel, CelebrateErrorAPIModel } = require('../utils/APIModels');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
  } else if (isCelebrateError(err)) {
    // Handle celebrate errors
    try {
      const errors = new CelebrateErrorAPIModel(err).getErrorsDetails();

      res.status(400).send({
        message: 'Ошибка валидации входных данных',
        details: errors,
      });
    } catch (e) {
      res.status(500).send(new ErrorAPIModel('Что-то пошло не так'));
    }
  } else if (err instanceof HttpError) {
    // Handle custom HttpErrors
    res.status(err.statusCode).send(new ErrorAPIModel(err.message));
  } else {
    // Handle uncaught errors
    res.status(500).send(new ErrorAPIModel('Что-то пошло не так'));
  }
};

module.exports = errorHandler;
