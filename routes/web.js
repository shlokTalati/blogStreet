const express = require("express");
const Router = express.Router();
const {layoutPath} = require('../config');
const middlewares = require("../middlewares/web");

Router.use(middlewares.checkLoggedInStatus());

Router.get("/", (req, res) => {
    res.render(layoutPath, {
        viewPath: "home.ejs",
        title: "Home"
    });
});

Router.get('/profile', (req, res)=>{
    res.render(layoutPath, {
        viewPath: "profile.ejs",
        title: "User Profile",
    })
})

module.exports = Router;