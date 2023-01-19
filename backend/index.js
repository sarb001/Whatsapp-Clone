const express = require('express');
const connectdb = require('./db');

const app = express();

const UserRoute = require('./Routes/UserRoutes');
const ChatRoutes = require('./Routes/ChatRoutes');
const MessageRoutes = require('./Routes/MessageRoutes');
const  dotenv = require('dotenv');

dotenv.config();
connectdb();

app.use(express.json());

// User Route 
app.use('/api/user', UserRoute);

// Chats Route 
app.use('/api/chat', ChatRoutes);

// Message Routes 
app.use('/api/message' ,MessageRoutes);

const PORT = 5000;

const server = app.listen(PORT ,() => {
    console.log(`Server is Running oonn.. ${PORT} .....`);
})

const io = require('socket.io')(server , {
    pingTimeout : 60000,
    cors : {
        origin : 'http://localhost:3000',
    },
})

io.on('connection', (socket) => {
    console.log(' Connected to Socket.io-- ');

    // When socket is on join ((   Backend Side )) 
    socket.on('setup' , (userData) => {
        socket.join(userData._id);                      //  When user joined the App.
        console.log(' New Room joined -',userData._id)              
        socket.emit('connection');
    })

    // Everytime new User Joined the Room
    socket.on('join chat new person' ,(room) => {
        socket.join(room);
        console.log('User joined Room '+ room);
    })

    socket.on('new message' , (newMessageRecieved) => {
        var chat =  newMessageRecieved.chat;

        if(!chat.users) return console.log('Chat.users not defined');

        // Send messages 
        chat.users.forEach((user) => {
            // if logged userid ==  message sender id
            // means himself -  not Send Message to  the Admin or Logged user 
            // 5 person in Grp except me ( admin ) everyone will recieve msg 

            if(user._id == newMessageRecieved.sender._id) return;

                // in means inside user's room emit/send msg 
                // with this user._id emit or show the Msg 
            socket.in(user._id).emit('message recieved' , newMessageRecieved);
        });
    });
})