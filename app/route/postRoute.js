const express = require('express');
const router = express.Router();
const {Post} = require('../model/postModel');
const {newPost, deletePost, editPost} = require('../controller/postController');
const {fetchPostByPostId} = require('../service/postService')


router.get("/new", async (req, res) => {
    res.render('new-post', {title: 'New post'});
});

router.post("/new", newPost);

router.get("/delete/:postId", deletePost);


router.post("/edit/:postId", editPost)



router.get("/:postId", async(req, res)=>{
    res.render('post', {title: "Post", post: await fetchPostByPostId(req.params.postId)});
});


module.exports = router;