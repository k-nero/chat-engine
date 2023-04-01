const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');
const Authenticate = require('../middleware/authenticate');
const {uploadImage} = require('../middleware/multerInstance');

router.post('/new-message', Authenticate.authenticate, MessageController.newMessage);
router.delete('/recall-message/:chatId/:messageId', Authenticate.authenticate, MessageController.recallMessage);
router.put('/media-message/:messageId', Authenticate.authenticate, uploadImage.single("picture"), MessageController.mediaMessage);
router.put('/react-message/:messageId', Authenticate.authenticate, MessageController.reactMessage);
router.patch('/edit-message/:messageId', Authenticate.authenticate, MessageController.editMessage);

module.exports = router;
