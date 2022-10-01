require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { errors } = require('celebrate');
const useMainRouter = require('./routes');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const { NODE_ENV = 'development', PORT = 3001 } = process.env;

const isDevelopment = NODE_ENV === 'development';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(limiter);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morganFormat = isDevelopment ? 'dev' : 'common';
app.use(morgan(morganFormat));

app.use(cors);

useMainRouter(app);

if (isDevelopment) {
  app.use(errors());
}
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(
    `WARNING! App has been launched in ${NODE_ENV.toUpperCase()} mode\nIt is listening to the port ${PORT}`,
  );
});
