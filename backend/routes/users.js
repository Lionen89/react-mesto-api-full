const router = require('express').Router(); // создали роутер
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getlUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users'); // импортировали контроллеры
// задали роуты
router.get('/', getAllUsers);
router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getlUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(
        /^(http:\/\/|https:\/\/|\www.){1}([0-9A-Za-z\-._~:/?#[\]@!$&'()*+,;=]+\.)([A-Za-z]){2,3}(\/)?/,
      ),
  }),
}), updateAvatar);

module.exports = router; // экспортировали роуты
