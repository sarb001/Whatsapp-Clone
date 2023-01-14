const express = require('express');
const connectdb = require('./db');

const app = express();

const UserRoute = require('./Routes/UserRoutes');
const ChatRoutes = require('./Routes/ChatRoutes');
const  dotenv = require('dotenv');

dotenv.config();
connectdb();

app.use(express.json());

// User Route 
app.use('/api/user', UserRoute);

// Chats Route 
app.use('/api/chat', ChatRoutes);

const PORT = 5000;

app.listen(PORT ,() => {
    console.log(`Server is Running oonn.. ${PORT} .....`);
})