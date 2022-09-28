const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');

const { JWT_SECRET, NODE_ENV = 'development' } = process.env;

const isDevelopment = NODE_ENV === 'development';

const auth = (req, res, next) => {
  let token = '';

  if (isDevelopment) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    token = authorization.replace('Bearer ', '');
  } else {
    token = req.cookies.jwt;
  }

  let payload;
  try {
    payload = jwt.verify(token, isDevelopment ? 'dev-secret' : JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
