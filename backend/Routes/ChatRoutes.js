const express = require('express');

const { protectedroute } = require('../Middleware/Protect');
const {  createchat, fetchallchats , createGroupchat ,
     renamegroup , removefromgroup , addtogroup
 } = require('../Controllers/ChatControllers');

const router = express.Router();

//  Create One-one Chat 
router.route('/').post( protectedroute  , createchat)

// Fetch all chats  (  Can be  GroupChat || or 1-1 Chat  )
router.route('/').get( protectedroute  , fetchallchats)

// Create Group Chat 

router.route('/group').post( protectedroute  , createGroupchat)
router.route('/rename').put( protectedroute  , renamegroup)
router.route('/groupadd').put( protectedroute  , addtogroup)
router.route('/groupremove').put( protectedroute  , removefromgroup)


module.exports = router;