const postModal = require('../models/postModel');
const postLikeModal = require('../models/postLikeModel');
const postCommentModal = require('../models/postCommentModel');


function millisecondsToStr (milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years)+ ' ago';
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days)+ ' ago';
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours)+ ' ago';
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes)+ ' ago';
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds)+ ' ago';
    }
    return 'less than a second'; //'just now' //or other string you like;
}

// get all post
exports.getAllPost = (req, res)=>{
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let postData = [];
    postModal.find({}).skip((page-1)*10).limit(limit).then(result=>{
        if(result.length>0){
            result.forEach(async(post)=>{
                let firstDate = new Date(post.date)
                let secondDate = new Date(Date.now())
                let timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
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
                        time:millisecondsToStr(timeDifference),
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