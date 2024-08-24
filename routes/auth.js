const express = require("express");
const Router = express.Router();
const path = require('path');

Router.get('/', (req,res)=>{
    res.render(path.join(__dirname, '../views/auth.ejs'));
});

Router.post('/login', (req, res)=>{
    
});

Router.post('/signup', (req,res)=>{

});

module.exports = Router;