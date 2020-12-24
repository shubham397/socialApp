const mongoose = require('mongoose');

var PostComment = mongoose.Schema({
    postId:{
        type:String,
    },
    comments:[{
        comment:{type:String},
        time:{type:Date}
    }]
}) 

let postComment = module.exports = mongoose.model('postComment', PostComment);