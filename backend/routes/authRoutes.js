const express = require('express');
const { login , register } = require('../controllers/authController');
const ipMiddleware = require('../middleware/ipMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/register', register);

router.post('/login', ipMiddleware, authMiddleware, login);

module.exports = router;