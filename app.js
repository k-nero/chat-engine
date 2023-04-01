require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('./config/mongoose.js');

const indexRouter = require('./api/index');

const app = express();

mongoose(app, process.env.MONGODB_URI);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "http://localhost:5000/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.use('/api/', indexRouter);

module.exports = app;
