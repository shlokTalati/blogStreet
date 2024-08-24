const express = require("express");
const Router = express.Router();
const {layoutPath} = require('../config');

Router.get("/", (req, res) => {
    res.render(layoutPath, {
        viewPath: "home.ejs",
        url: req.url,
        title: "Home"
    });
});

module.exports = Router;