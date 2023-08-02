// routes/register.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/user');

router.post('/register', authController.register);

module.exports = router;
