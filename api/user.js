const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Authenticate = require('../middleware/authenticate');

router.put('/add-friend', Authenticate.authenticate, userController.addFriend);
router.get('/get-chats', Authenticate.authenticate, userController.getChatList);
router.get('/get-friends', Authenticate.authenticate, userController.getFriendList);
router.patch('/update-profile', Authenticate.authenticate, userController.updateUser);
router.get('/get-profile/:userId', Authenticate.authenticate, userController.getUserProfile);
router.get('/get-info/', Authenticate.authenticate, userController.getUserInfo);

module.exports = router;
