const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validateUserInfo');

router.post('/register', validate.validateRegister, authController.register);
router.post('/login', validate.validateLogin, authController.login);

module.exports = router;
