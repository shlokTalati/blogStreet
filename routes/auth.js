const express = require("express");
const Router = express.Router();
const UserModel = require('../models/User');
const path = require('path');

const authController = require('../controllers/auth');

Router.get('/', (req,res)=>{
    res.render(path.join(__dirname, '../views/auth.ejs'));
});

Router.post('/login', authController.login());

Router.post('/signup', authController.signup());

Router.get('/logout', authController.logout());

module.exports = Router;