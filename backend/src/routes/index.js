const { celebrate, Joi, Segments } = require('celebrate');
const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');
const { login, createUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { userSchemas, commonSchemas } = require('../utils/validation');

module.exports = function useMainRouter(app) {
  app.post('/signin', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: userSchemas.email,
      password: userSchemas.password,
    }),
  }), login);
  app.post('/signup', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: userSchemas.name,
      about: userSchemas.about,
      avatar: commonSchemas.url,
      email: userSchemas.email,
      password: userSchemas.password,
    }),
  }), createUser);

  app.use(auth);

  app.use('/users', userRouter);
  app.use('/cards', cardRouter);
};
