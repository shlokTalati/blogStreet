const express = require('express');
const router = express.Router();
const {Post} = require('../model/postModel');
const {newPost, fetchPostByPostId, deletePostById, editPostById} = require('../controller/postController');

router.get("/new", async (req, res) => {
    res.render('new-post', {title: 'New post'});
});

router.post("/new", newPost);

router.get("/delete/:postId", deletePostById);


router.post("/edit/:postId", editPostById)



router.get("/:postId", async(req, res)=>{
    res.render('post', {title: "Post", post: await fetchPostByPostId(req.params.postId)});
});


module.exports = router;