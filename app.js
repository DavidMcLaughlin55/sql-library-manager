// var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/books');
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
app.use('/books', bookRouter);
app.use('/books/new', newBookRouter);
app.use('/books/update', updateBookRouter);

//Error Handlers
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Oh no! It looks like something went wrong.";
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status = 404;
        res.render('page-not-found', err);
    } else {
        err.message = err.message;
        err.status = 500;
        res.render('error', err);
    };
});

module.exports = app;
