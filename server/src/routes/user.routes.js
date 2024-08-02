const express = require('express');
const users = require('../controllers/user.controller');
const router = express.Router();
const verifyJWT = require('../middleware/auth.middleware');

router.get('/home', verifyJWT ,users.getAllUsersController)
router.post('/login', users.loginController);
router.post('/register', users.registerController);
module.exports = router;