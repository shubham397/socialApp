const mongoose = require('mongoose');

var Post = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        fileName:{type:String}
    }],
    date:{type:Date}
}) 

let post = module.exports = mongoose.model('post', Post);