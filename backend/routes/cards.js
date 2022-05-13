const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, setLike, dislikeCard,
} = require('../controllers/cards'); // импортировали контроллеры
// задали роуты
router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required()
      .regex(
        /^(http:\/\/|https:\/\/|\www.){1}([0-9A-Za-z]+\.)([A-Za-z]){2,3}(\/)?/,
      ),
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
  headers: Joi.object().keys({
    authorization: Joi.string().required().min(2).max(200),
  }).unknown(true),
}), dislikeCard);

module.exports = router; // экспортировали роуты
