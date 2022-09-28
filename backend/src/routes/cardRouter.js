const cardRouter = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardController');
const { cardSchemas, commonSchemas } = require('../utils/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: cardSchemas.name.required(),
    link: commonSchemas.url.required(),
  }),
}), createCard);
cardRouter.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({ cardId: commonSchemas.id }),
}), deleteCard);
cardRouter.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({ cardId: commonSchemas.id }),
}), likeCard);
cardRouter.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({ cardId: commonSchemas.id }),
}), dislikeCard);

module.exports = cardRouter;
