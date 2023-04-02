const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/mediaController');

router.get('/get-media/', MediaController.getMedia);
router.delete('/', MediaController.deleteMedia);
router.get('/media-player', MediaController.videoStreaming);
router.get('/file', MediaController.getFiles);

module.exports = router;
