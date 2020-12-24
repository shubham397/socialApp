const mongoose = require('mongoose');

var PostLike = mongoose.Schema({
    postId:{
        type:String,
    },
    likeCount:{type:Number},
    date:{type:Date}
}) 

let postLike = module.exports = mongoose.model('postLike', PostLike);