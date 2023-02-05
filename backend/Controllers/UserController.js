const User = require('../Schemas/UserSchema');
const bcrypt = require('bcryptjs');
const jsoncreatetoken = require('./JsoncreateToken');

// Register User
 const UserRegister = async(req,res) => {

    try{
        const {name,email,password,pic} = req.body;
        if(!name || !email || !password)
        {
            res.status(400);
            throw new Error('Fill All the Fields Now');
        }
        const finduser =  await User.findOne({email})
    
        if(finduser){
            res.status(400);
            throw new Error(' User already Exist.. ');
        }
    
        const salt =  await bcrypt.genSalt(10);
        const hashpassword  = await bcrypt.hash(req.body.password,salt);            // bcrypt password 

        const user = await User.create({
            name : name ,
            email :email,
            password : hashpassword,
            pic : pic,
        })
    
        if(user)
        {       res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                password : user.password,
                pic : user.pic,
                token : jsoncreatetoken(user._id),
            });
        }else{
            res.status(400);
            throw new Error(' Not able to create User ');
        }
    
    }catch(error)
    {
        res.status(400);
        throw new Error(' Error while fetching From Request  ');
    }
}

// Loggingin User 
const loginUser = async(req,res) => 
{
    const {email ,password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error('Fill All the Fields Now');
    }

    const user = await User.findOne({email});
    const comparepass =  bcrypt.compare(password , user.password)   // pass entered by user, pass of user find in db 

        if(!comparepass)
        {
            res.status(400).json({error : 'Wrong User  Credentials Now '});
        }

    if(user && (comparepass))               
    {   
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            password : user.password,
            pic : user.pic,
            token : jsoncreatetoken(user._id),
        })
    }else{
        res.status(401);
        throw new Error(' Invalid Email or Password ');
    }
}

//  Access All Users 
// Only verified user can access it 
const GetallUsers   =  async(req,res) => {
    
    const  keyword  = req.query.search ?  {
        $or : [
            { name :  { $regex : req.query.search , $options : "i"}},
            { email : { $regex : req.query.search , $options : "i"}},
        ]
    }: {};
        // Find Keyword  in user by Id 

    const users = await User.find(keyword).find({_id :  {$ne : req.user._id }});  
    res.send(users);
}

module.exports = { UserRegister , loginUser , GetallUsers };