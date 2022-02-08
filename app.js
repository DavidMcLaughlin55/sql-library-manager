const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const newBookRouter = require('./routes/new-book');
const updateBookRouter = require('./routes/update-book');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', booksRouter);
app.use('/', newBookRouter);
app.use('/', updateBookRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// // Global Error Handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        err.status = 404;
        err.message = `Sorry! We couldn't find the page you were looking for.`;
        res.render('page-not-found', { err });
    } else {
        err.status = 500;
        err.message = 'Sorry! There was an unexpected error on the server.';
        res.render('error', { err });
    };
});

module.exports = app;
