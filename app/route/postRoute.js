const express = require('express');
const router = express.Router();
const {Post} = require('../model/postModel');
const {newPost, fetchPostByPostId, deletePostById, editPostById} = require('../controller/postController');

router.get("/new", async (req, res) => {
    res.render('new-post', {title: 'New post'});
});

router.post("/new", newPost);

router.get("/delete/:postId", async (req, res) => {
    await deletePostById(req.params.postId);
    res.redirect('/user/my-posts');
})

router.post("/edit/:postId", async (req, res) => {

    let temp = "success"
    if(!await editPostById(req.params.postId, {title: req.body.editTitle, content: req.body.editContent})){
        temp = "editfailed"
    }
    res.redirect('/user/my-posts?msg=' + temp);
})



router.get("/:postId", async(req, res)=>{
    res.render('post', {title: 'New Post', post: await fetchPostByPostId(req.params.postId)});
});


module.exports = router;