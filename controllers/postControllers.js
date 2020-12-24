const postModal = require('../models/postModel');
const postLikeModal = require('../models/postLikeModel');
const postCommentModal = require('../models/postCommentModel');

// get all post
exports.getAllPost = (req, res)=>{
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let postData = [];
    postModal.find({}).skip((page-1)*10).limit(limit).then(result=>{
        if(result.length>0){
            result.forEach(async(post)=>{
                let newPostData = {}
                await postLikeModal.findOne({postId:post._id}).then(resultLike=>{
                    newPostData.likeCount = resultLike.likeCount;
                }).catch(errLike=>{
                    console.log(errLike);
                    return res.send("Something went wrong");
                })
    
                await postCommentModal.findOne({postId:post._id}).then(resultComment=>{
                    newPostData.commentData = resultComment;
                    postData.push({
                        post:post,
                        likeCount:newPostData.likeCount,
                        commentData:newPostData.commentData,
                        commentCount:resultComment.comments.length
                    })
                    return res.send(postData);
                }).catch(errLike=>{
                    console.log(errLike);
                    return res.send("Something went wrong");
                })
            })
        }
        else{
            return res.send("No post found on given Page");
        }
    }).catch(err=>{
        console.log(err);
        return res.send("Something went wrong");
    });
}

// get All Comment by Post Id
exports.getAllComment = (req, res)=>{
    let postId = req.params.postId;
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);

    postCommentModal.find({postId:postId}).skip((page-1)*10).limit(limit).then(result=>{
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