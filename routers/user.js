const express = require('express');
const router = express.Router();

const {postLogin} = require('../controllers/userContollers') // controllers

router.post('/login',postLogin);

module.exports = router;