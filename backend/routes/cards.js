const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const { regularExpression } = require('../constants');
const {
  getCards, createCard, deleteCard, setLike, dislikeCard,
} = require('../controllers/cards'); // импортировали контроллеры
// задали роуты
router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required()
      .regex(regularExpression),
  }),
}), createCard);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), setLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
}), dislikeCard);

module.exports = router; // экспортировали роуты
