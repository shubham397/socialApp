const postModal = require('../models/postModel');
const postLikeModal = require('../models/postLikeModel');
const postCommentModal = require('../models/postCommentModel');

exports.getAllPost = (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    userModal.create({
        "name":name,
        "email":email
    })
    .then(user=>{
        res.send("Login successful");
    })
    .catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
}

// get All Comment by Post Id
exports.getAllComment = (req, res)=>{
    let postId = req.params.postId;

    postCommentModal.find({postId:postId}).then(result=>{
        res.send(result);
    }).catch(err=>{
        console.log(err);
    });
}

exports.createPost = (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    userModal.create({
        "name":name,
        "email":email
    })
    .then(user=>{
        res.send("Login successful");
    })
    .catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
}

exports.postLike = (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    userModal.create({
        "name":name,
        "email":email
    })
    .then(user=>{
        res.send("Login successful");
    })
    .catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
}

exports.postComment = (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    userModal.create({
        "name":name,
        "email":email
    })
    .then(user=>{
        res.send("Login successful");
    })
    .catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
}