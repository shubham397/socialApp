const mongoose = require('mongoose');

var User = mongoose.Schema({
    name:{type:String},
    email:{
        type:String,
        require:true
    },
    date:{type:Date}
}) 