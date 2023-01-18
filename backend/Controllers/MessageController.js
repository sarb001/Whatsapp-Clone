

const Chat = require('../Schemas/ChatSchema');
const Message = require('../Schemas/MessageSchema');
const User = require('../Schemas/UserSchema');
const jsoncreatetoken = require('./JsoncreateToken');

// Able to Send Message
const sendmessage = async(req,res) => {
    const {  content , chatid } = req.body;
    if(!content || !chatid)                    // id to coonect with new is notGiven 
    {
        res.status(400);
        throw new Error(' Invalid Credentails ')
    }

    try{
        // Message is created with few Specific Details 
        var message = await Message.create({
            sender : req.user._id,
            content : content,
            chat : chatid,
        })

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message , {
                 path : 'chat.users',
                 select : "name pic email",
        });

        // to get the latest Updated  message need to update msg everytime 
         await Chat.findByIdAndUpdate(req.body.chatid , {
            latestMessage : message,
         });
         res.json(message);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
}


// Fetch all Messages by Particular Id 
const messagebyid = async(req,res) => {

    try{
        const messages = await Message.find({ chat : req.params.chatid })
        .populate("sender","name pic email")
        .populate("chat");

        res.json(messages);
    }catch(error)
    {
        res.status(400);
        throw new Error(error.message);
    }
}



module.exports = { sendmessage  ,messagebyid}