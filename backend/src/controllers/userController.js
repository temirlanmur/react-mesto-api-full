const MongooseError = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { UserAPIModel } = require('../utils/APIModels');
const { BadRequestError, NotFoundError, ConflictError } = require('../utils/errors');

const { JWT_SECRET, NODE_ENV = 'development' } = process.env;

const isDevelopment = NODE_ENV === 'development';

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      isDevelopment ? 'dev-secret' : JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find({});

    res.send(users.map((user) => new UserAPIModel(user)));
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) throw new NotFoundError(`Пользователь по указанному id ${userId} не найден`);

    res.send(new UserAPIModel(user));
  } catch (err) {
    if (err instanceof MongooseError.CastError) next(new BadRequestError(`Передан некорректный формат id ${userId} пользователя`));
    else next(err);
  }
}

async function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });

    res.status(201).send(new UserAPIModel(user));
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    else if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
    else next(err);
  }
}

async function getProfile(req, res, next) {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) throw new NotFoundError('Информация не найдена');

    res.send(new UserAPIModel(user));
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) throw new NotFoundError(`Пользователь по указанному id ${userId} не найден`);

    res.send(new UserAPIModel(user));
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    else next(err);
  }
}

async function updateProfileAvatar(req, res, next) {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) throw new NotFoundError(`Пользователь по указанному id ${userId} не найден`);

    res.send(new UserAPIModel(user));
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
    else next(err);
  }
}

module.exports = {
  login,
  getUser,
  getUsers,
  createUser,
  getProfile,
  updateProfile,
  updateProfileAvatar,
};
