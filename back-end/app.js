const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const { defaultErrorHandler } = require('./middlewares/errorHandlers.middleware');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiV1Router = require('./routes/api/v1');

// Init Express
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1', apiV1Router);

// Error Handlers
app.use(defaultErrorHandler);

module.exports = app;
