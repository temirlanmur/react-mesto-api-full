const MongooseError = require('mongoose').Error;
const { Card } = require('../models/cardModel');
const { CardAPIModel, DocumentDeleteAPIModel } = require('../utils/APIModels');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../utils/errors');

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({});

    res.send(cards.map((card) => new CardAPIModel(card)));
  } catch (err) {
    next(err);
  }
}

async function createCard(req, res, next) {
  const { name, link } = req.body;
  const ownerId = req.user._id;

  try {
    const card = await Card.create({ name, link, owner: ownerId });

    res.status(201).send(new CardAPIModel(card));
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    else next(err);
  }
}

async function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    // const card = await Card.findByIdAndRemove(cardId);
    const card = await Card.findById(cardId);

    if (!card) throw new NotFoundError(`Передан несуществующий id ${cardId} карточки`);
    if (card.owner.toString() !== userId) throw new ForbiddenError('Недостаточно прав для удаления карточки');

    await Card.findByIdAndRemove(cardId);
    res.send(new DocumentDeleteAPIModel('Карточка удалена'));
  } catch (err) {
    if (err instanceof MongooseError.CastError) next(new BadRequestError(`Передан некорректный формат id ${cardId} карточки`));
    else next(err);
  }
}

async function likeCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!card) throw new NotFoundError(`Передан несуществующий id ${cardId} карточки`);

    res.send(new CardAPIModel(card));
  } catch (err) {
    if (err instanceof MongooseError.CastError) next(new BadRequestError(`Передан некорректный формат id ${cardId} карточки`));
    else next(err);
  }
}

async function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    );

    if (!card) throw new NotFoundError(`Передан несуществующий id ${cardId} карточки`);

    res.send(new CardAPIModel(card));
  } catch (err) {
    if (err instanceof MongooseError.CastError) next(new BadRequestError(`Передан некорректный формат id ${cardId} карточки`));
    else next(err);
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
