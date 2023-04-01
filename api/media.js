const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/mediaController');

router.get('/', MediaController.getMedia);
router.delete('/', MediaController.deleteMedia);

module.exports = router;
