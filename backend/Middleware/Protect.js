
const jwt   = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../Schemas/UserSchema');

// Middleware for protected Route 

const protectedroute = async(req,res,next) => {

    let token;
    if(req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer'))
    {
        try
        {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token ,process.env.JWT_SECRET);
            console.log('  Decoded is  -------  ' , decoded);                   /// Will Give us ID
           
            req.user = await User.findById(decoded.id).select('-password');     //  find by id 
            next();
            
        }catch(error)
        {
            res.status(401);
            throw new Error(" Not Authorized  ,token Failed");
        }
    }

    if(!token)
    {
        res.status(401);
        throw new Error(" Not Authorized ,No Token ");
    }
}

module.exports = {  protectedroute };