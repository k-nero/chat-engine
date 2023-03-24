require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('./config/mongoose.js');
mongoose?.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const authApi = require('./api/auth');
const messageApi = require('./api/message');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', messageApi);
app.use('/', authApi);

module.exports = app;
