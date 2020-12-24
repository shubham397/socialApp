const userModal = require('../models/userModel');

exports.postLogin = (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;

    userModal.create({
        "name":name,
        "email":email,
        "date":Date.now()
    })
    .then(user=>{
        res.send("Login successful");
    })
    .catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
}