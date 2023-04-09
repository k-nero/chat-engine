const express = require('express');
const router = express.Router();

const messageRouter = require('./message');
const chatRouter = require('./chat');
const userRouter = require('./user');
const authRouter = require('./auth');
const signalingRouter = require('./signaling');
const mediaRouter = require('./media');

router.use(function (req, res, next)
{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Range");
    next();
});

router.use('/message/', messageRouter);
router.use('/chat/', chatRouter);
router.use('/user/', userRouter);
router.use('/auth/', authRouter);
router.use('/signal/', signalingRouter);
router.use('/media/', mediaRouter);

module.exports = router;
