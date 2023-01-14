
const jwt = require('jsonwebtoken');

// Able to Create Token Now 
const jsoncreatetoken = (id) => {
    
     return  jwt.sign( {id}, process.env.JWT_SECRET , {
            expiresIn:'30d',
    })
}

module.exports = jsoncreatetoken;