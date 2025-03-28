const express = require('express');
const router = express.Router();
const {Post} = require('../model/postModel');
const {newPost, fetchPostById} = require('../controller/postController');

router.get("/new", async (req, res) => {
    res.render('new-post', {title: 'New post'});
});

router.post("/new", newPost);


router.get("/:postId", async(req, res)=>{
    res.render('post', {title: 'New Post', post: await fetchPostById(req.params.postId)});
});


module.exports = router;