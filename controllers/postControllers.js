const postModal = require('../models/postModel');
const postLikeModal = require('../models/postLikeModel');
const postCommentModal = require('../models/postCommentModel');

exports.getAllPost = (req, res)=>{
    let postData = [];
    postModal.find({}).then(result=>{

    }).catch(err=>{
        console.log(err);
        return res.send("Something went wrong");
    });
}

// get All Comment by Post Id
exports.getAllComment = (req, res)=>{
    let postId = req.params.postId;

    postCommentModal.find({postId:postId}).then(result=>{
        return res.send(result);
    }).catch(err=>{
        console.log(err);
        return res.send("Something went wrong");
    });
}

// create post by user ID
exports.createPost = (req, res)=>{
    let user = req.params.userId;
    let title = req.body.title;
    let description = req.body.description;
    let images = req.files.images || [];

    images.forEach((data)=>{
        postModal.update(
            {userId:user},
            { $set:{userId:user, title:title, description:description, date:Date.now()},$push:{ 'images':{'fileName':data.name}}},
            {new:true, upsert:true}).then(result=>{
                console.log(result);
            }).catch(err=>{
                console.log(err);
                res.send(err);
            })
    })
    res.send("Insert Successfully")
}

// increase like by post id
exports.postLike = (req, res)=>{
    let post = req.params.postId;

    postLikeModal.findOneAndUpdate(
        {postId:post},
        {$set:{postId:post},$inc: {likeCount:1}}, 
        {new:true, upsert: true}).then(result=>{
            return res.send(result);
        }).catch(err=>{
            console.log(err);
            return res.send("Something went wrong");
        });
}


// create new comment by post id
exports.postComment = (req, res)=>{
    let post = req.params.postId;
    let commentData = req.body.comment;

    postCommentModal.findOneAndUpdate(
        {postId:post},
        {$push:{ 'comments':{'comment':commentData, 'time':Date.now()}}},
        {new:true, upsert:true}).then(result=>{
            return res.send(result);
        }).catch(err=>{
            console.log(err);
            return res.send(err);
        })
}