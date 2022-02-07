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
app.use('/books', newBookRouter);
app.use('/books', updateBookRouter);

// Catches 404 and forwards to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renders the error page based on status
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('page-not-found', err);
    } else {
        res.render('error', err);
    }
});

module.exports = app;
