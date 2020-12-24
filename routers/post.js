const express = require('express');
const router = express.Router();

const {postLogin} = require('../controllers/userContollers') // controllers

router.get('/login',postLogin);

module.exports = router;