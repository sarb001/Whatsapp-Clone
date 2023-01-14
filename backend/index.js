const express = require('express');
const connectdb = require('./db');

const app = express();
const  dotenv = require('dotenv');

dotenv.config();
connectdb();

app.use(express.json());

const PORT = 5000;
app.listen(PORT ,() => {
    console.log(`Server is Running on ${PORT} .....`);
})