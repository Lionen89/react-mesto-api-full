const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => {
      next(new Error('Произошла ошибка.'));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(new Error('Произошла ошибка.'));
      }
    });
};
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  if (cardId.length !== 24) {
    next(new BadRequestError('Неверно указан _id карточки.'));
  }
  Card.findById({ _id: cardId })
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Передан несуществующий _id карточки.'));
      } if (card.owner.toHexString() !== ownerId) {
        return next(new ForbiddenError('Вы не можете удалить не свою карточку.'));
      }
      return Card.findOneAndRemove({ _id: cardId })
        .then(() => {
          res.send(card);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id '));
      } else {
        next(new Error('Произошла ошибка.'));
      }
    });
};

module.exports.setLike = (req, res, next) => {
  if (req.params.cardId.length !== 24) {
    next(new BadRequestError('Неверно указан _id карточки.'));
  }
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id '));
      } else {
        next(new Error('Произошла ошибка.'));
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  if (req.params.cardId.length !== 24) {
    next(new BadRequestError('Неверно указан _id карточки.'));
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        next(new NotFoundError('Передан несуществующий _id карточки.'));
      } else res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id '));
      } else {
        next(new Error('Произошла ошибка.'));
      }
    });
};
