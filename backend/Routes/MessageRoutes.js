

const express = require('express');
const { sendmessage ,messagebyid } = require('../Controllers/MessageController');
const { protectedroute } = require('../Middleware/Protect');

const router = express.Router();;

//  Send message to Route 
router.route('/').post(protectedroute, sendmessage);


// Get Message  or  Chats  of Specific user byID 
router.route('/:chatid').get(protectedroute, messagebyid);

module.exports = router