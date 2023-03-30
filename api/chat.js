const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/create-chat', chatController.createChat);
router.patch('/rename-chat', chatController.renameChat);
router.delete('/leave-chat', chatController.leaveChat);
router.get('/get-members/:chatId', chatController.getMembers);
router.get('/get-messages/:chatId', chatController.getAllMessages);

module.exports = router;
