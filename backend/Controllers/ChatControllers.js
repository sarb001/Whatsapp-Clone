

const Chat = require('../Schemas/ChatSchema');
const User = require('../Schemas/UserSchema');
const jsoncreatetoken = require('./JsoncreateToken');


// Create chat one-one
const createchat = async(req,res) => {
    const { userid } = req.body;            // id of new guy whom we want to create chat with 

    if(!userid)                    // id to coonect with new is notGiven 
    {
        res.status(400);
        throw new Error(' User id is not Present or Incorrect Id of New User  ')
    }

    // Check if Id's are not same or User's already don't have Existing Chats
    var checkchatspresent = await  Chat.find(
        {
            isGroupChat :false,         // It is not groupchat 
            $and : [
                { users: { $elemMatch : { $eq : req.user._id } }},      // Loggedin Id
                { users: { $elemMatch : { $eq : req.userid } }},        // Provided by new user 
            ],
        })
        .populate("users")
        .populate("latestMessage");

        // If Present then populate data (( show all ))
        // Show path 
        checkchatspresent = await User.populate(checkchatspresent , {
                path : "latestMessage.sender",
                select : "name pic email",
        });

        // If chat already present then just pick that or First One 
        if(checkchatspresent.length > 0)
        {
            res.send(checkchatspresent[0])
        }else{              // So Now create chat between two Users

            const chatmodel = {
                chatName : "sender",
                isGroupChat : false,
                users : [req.user._id , userid],
            };
            try{
                const createchatfortwo =  await  Chat.create(chatmodel);    /// chat is created 
                const fullchat = await Chat.findOne({_id : createchatfortwo._id}).populate(
                    "users",
                );

                res.status(200).send(fullchat);
            }catch(error)
            {
                    res.status(400);
                    throw new Error(error);
            }
        }
}

// fetch all users linked chats 
const fetchallchats = async(req,res) => {
  
        try{
            console.log('user id is-- ',req.user._id);
            Chat.find({users: {$elemMatch : { $eq : req.user._id } }})
            .populate("users")
            .populate("groupAdmin")
            .populate("latestMessage")
            .sort({ updateAt : -1 })
            .then(async (results) => {
                results = await User.populate(results , {
                    path : "latestMessage.sender",
                    select : "name pic email",
                });
                res.status(200).send(results);
            })
        }catch(error)
        {
            res.status(400);
            throw new Error(error);
        }
}



// create Group Chats   (( 1-many   )) 
const createGroupchat = async(req,res) => {
    // check if all users & groupname is Present or not 
    if(!req.body.users || !req.body.name)
    {
        return res.status(400).send({ mesasge : 'Please Fill all the Fields '})
    }

    var users = JSON.parse(req.body.users);     
        // get Data in Server as Obj.  
            // body.users are Array so make them Object to parse

        // User group at least 2 users to create GROUP
    if(users.length < 2){
        return res.status(400).send(' Must have 2 Users to Create Chat  ')
    }  

    users.push(req.user)        // admin or user is added in groupchat 
                                // we need Admin also in chat 

         try{
                    // create Group Chat
                    const groupchat = await Chat.create({
                        chatName : req.body.name,
                        users : users,
                        isGroupChat : true,
                        groupAdmin : req.user,
                    })

                    // Now find user on chat and get all his Data 
                    // so easy to dothnigs like fetch messages and other things
                    const fullGroupchat = await Chat.findOne({_id : groupchat._id })
                    .populate("users" ,"-password")
                    .populate("groupAdmin" ,"-password");

                    res.status(200).json(fullGroupchat);
         }catch(error)
            {
                res.status(400);
                throw new Error(error.mesasge);
            }
 
}

// Rename this  Group or update by getting ID
const renamegroup = async(req,res) => {

  const {chatid  , chatName} = req.body;
  const updatedchat = await Chat.findByIdAndUpdate(
    chatid ,
    {
        chatName : chatName             // chatname updated here
    },
    {
        new: true 
    })
    .populate("users" , "-password")
    .populate("groupAdmin" , "-password")

    //chat not found 
    if(!updatedchat)
    {
        res.status(404);
        throw new Error(" Chat not Found  ");
    }else{
        res.json(updatedchat);          // If  Found then show it 
    }
}



// Remove Specific user form Group 
// For Remove  use Pull
const removefromgroup = async(req,res) => {

    const {chatid  , userid } = req.body;
    const removedchat = await Chat.findByIdAndUpdate(
      chatid ,
      {
          $pull : { users : userid }        // remove from Group  
      }, 
      {  new: true  })
      .populate("users" , "-password")
      .populate("groupAdmin" , "-password")
  
      //chat not found 
      if(!removedchat)
      {
          res.status(404);
          throw new Error(" Chat not Found  ");
      }else{
          res.json(removedchat);          // If  Found then show it 
      }

}

// Add Specific user in Group 
// For Adding use Push
const addtogroup = async(req,res) => {

    const {chatid  , userid } = req.body;
    const addedchat = await Chat.findOneAndUpdate(
      chatid ,
      {
          $push : { users : userid }
      }, 
      {  new: true  })
      .populate("users" , "-password")
      .populate("groupAdmin" , "-password")
  
      //chat not found 
      if(!addedchat)
      {
          res.status(404);
          throw new Error(" Chat not Found  ");
      }else{
          res.json(addedchat);          // If  Found then show it 
      }

}

module.exports =  {createchat ,fetchallchats , createGroupchat ,
    renamegroup , removefromgroup , addtogroup };


