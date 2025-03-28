const express = require('express');
const router = express.Router();
const {fetchAllPosts} = require('../controller/postController');

router.get("/", async (req, res) => {
    try{
        let posts = await fetchAllPosts();
        res.render("home", {title: "blogStreet", posts:posts});
    }
    catch (error){
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;