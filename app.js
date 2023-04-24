require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const mongoose = require('./config/mongoose.js');
const redis = require('./config/redis.js');

const indexRouter = require('./api/index');

const app = express();

mongoose(app, process.env.MONGODB_URI);
redis.connect().then().catch(err => console.log(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/', indexRouter);

module.exports = app;
