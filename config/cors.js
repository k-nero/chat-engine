const express = require('express');
const router = express.Router();

router.options('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

module.exports = router;
