/* eslint-disable no-console */
const express = require('express');
const cors = require('./middlewares/cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');

const {
  PORT = 3001,
} = process.env;

const app = express();

app.use(cookieParser('s!Cr1T_kEy'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
}, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB!');
});

app.use(requestLogger); // подключаем логгер запросов
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(
        /^(http:\/\/|https:\/\/|\www.){1}([0-9A-Za-z\-._~:/?#[\]@!$&'()*+,;=]+\.)([A-Za-z]){2,3}(\/)?/,
      ),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));

app.use('/cards', auth, require('./routes/cards'));

app.use('*', auth, () => {
  throw new NotFoundError('Страницы по данному адресу не существует');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
