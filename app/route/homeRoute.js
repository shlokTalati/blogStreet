const express = require('express');
const router = express.Router();
const {preparePostCardData} = require('../service/postCardService')
const {fetchAllPosts} = require('../service/postService');

router.get("/", async (req, res) => {
    try{
        const postCardData = await preparePostCardData(req.user._id, fetchAllPosts());
        res.render("home", {title: "blogStreet", postCardData});
    }
    catch (error){
        res.status(500).send("Home Route Error");
    }
});

module.exports = router;