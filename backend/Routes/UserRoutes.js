const express = require('express');
const { UserRegister  , loginUser, GetallUsers } = require('../Controllers/UserController');
const { protectedroute } = require('../Middleware/Protect');

const router = express.Router();

// For Registration 
router.route('/').post(UserRegister)

// For Logging  Data
router.route('/login').post(loginUser)

// Verified Route only to accessdata 
router.route('/').get(  protectedroute ,GetallUsers)


module.exports = router;