const mongoose = require('mongoose');

var PostLike = mongoose.Schema({
    postId:{
        type:String,
    },
    likeCount:{type:Number, default:0}
}) 

let postLike = module.exports = mongoose.model('postlike', PostLike);