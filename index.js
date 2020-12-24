const port = 3000;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const userRoute = require('./routers/user')
const postRoute = require('./routers/post')

const app = express();
app.use(fileUpload());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/social');

app.use('/user',userRoute);

app.listen(port, ()=>{
    console.log("App is running on - ", port);
})
