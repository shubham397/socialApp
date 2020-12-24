const mongoose = require('mongoose');

var User = mongoose.Schema({
    name:{type:String},
    email:{
        type:String,
        required:true
    },
    date:{type:Date}
}) 

let user = module.exports = mongoose.model('user', User);