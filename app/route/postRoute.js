const express = require('express');
const router = express.Router();
const {submitNewPost, deletePost, editPost, postImageUpload, renderNewPostPage, renderPost} = require('../controller/postController');


router.get("/new", renderNewPostPage);

router.post("/new", postImageUpload.array('newPostImages', 4) ,submitNewPost);

router.get("/delete/:postId", deletePost);

router.post("/edit/:postId", editPost)

router.get("/:postId", renderPost);


module.exports = router;