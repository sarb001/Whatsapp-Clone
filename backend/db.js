const mongoose = require('mongoose');

mongoose.set('strictQuery' , false);

 const connectdb = async(req,res) => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URL , {

        });
        console.log(` Mongodb Connected--- ,   ${conn.connection.host} `);
    }catch(error)
    {
        console.log(' Error in  Connection ');
        console.log(error)
        process.exit();
    }
}
module.exports = connectdb;