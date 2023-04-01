const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const Authenticate = require('../middleware/authenticate');

router.post('/create-chat', Authenticate.authenticate, chatController.createChat);
router.patch('/rename-chat', Authenticate.authenticate, chatController.renameChat);
router.delete('/leave-chat', Authenticate.authenticate, chatController.leaveChat);
router.get('/get-members/:chatId', Authenticate.authenticate, chatController.getMembers);
router.get('/get-messages/:chatId', Authenticate.authenticate, chatController.getAllMessages);

module.exports = router;
