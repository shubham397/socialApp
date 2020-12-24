const port = 3000;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./routers/user')

const app = express();

app.use(bodyParser.json());

app.use('/user',userRoute);

app.listen(port, ()=>{
    console.log("App is running on - ", port);
})
