const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const { NODE_ENV = 'development' } = process.env;
const isDevelopment = NODE_ENV === 'development';

const logsDirectory = path.join(__dirname, '../../logs');

const requestLoggerOptions = {
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'request.log'),
    }),
  ],
  format: winston.format.json(),
};

const errorLoggerOptions = {
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, 'error.log'),
    }),
  ],
  format: winston.format.json(),
};

if (isDevelopment) {
  requestLoggerOptions.transports = [new winston.transports.Console()];
  requestLoggerOptions.msg = 'HTTP {{req.method}} {{req.url}} - {{res.statusCode}} {{res.responseTime}}ms';
  requestLoggerOptions.meta = false;
  requestLoggerOptions.format = winston.format.simple();

  errorLoggerOptions.transports = [new winston.transports.Console()];
  errorLoggerOptions.msg = '{{res.statusCode}} {{req.method}} - {{err.message}}';
  errorLoggerOptions.meta = false;
  errorLoggerOptions.format = winston.format.simple();
}

const requestLogger = expressWinston.logger(requestLoggerOptions);

const errorLogger = expressWinston.errorLogger(errorLoggerOptions);

module.exports = {
  requestLogger,
  errorLogger,
};
