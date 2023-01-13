const express = require('express');
const connectdb = require('./db');

const app = express();


const  dotenv = require('dotenv');

dotenv.config();
connectdb();

app.listen(5000 ,() => {
    console.log('Server is Running.....');
})