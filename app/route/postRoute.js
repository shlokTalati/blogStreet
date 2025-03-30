const express = require('express');
const router = express.Router();
const {newPost, deletePost, editPostController} = require('../controller/postController');
const {fetchPostByPostId} = require('../service/postService')
const {fetchAllCategories} = require('../service/categoryService');


router.get("/new", async (req, res) => {
    let categories = await fetchAllCategories();
    res.render('new-post', {title: 'New post', categories: categories});
});

router.post("/new", newPost);

router.get("/delete/:postId", deletePost);


router.post("/edit/:postId", editPostController)



router.get("/:postId", async(req, res)=>{
    res.render('post', {title: "Post", post: await fetchPostByPostId(req.params.postId)});
});


module.exports = router;