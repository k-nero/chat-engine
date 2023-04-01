const express = require('express');
const router = express.Router();

const messageRouter = require('./message');
const chatRouter = require('./chat');
const userRouter = require('./user');
const authRouter = require('./auth');
const signalingRouter = require('./signaling');
const mediaRouter = require('./media');

router.use('/message/', messageRouter);
router.use('/chat/', chatRouter);
router.use('/user/', userRouter);
router.use('/auth/', authRouter);
router.use('/signal/', signalingRouter);
router.use('/media/', mediaRouter);

module.exports = router;
