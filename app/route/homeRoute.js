const express = require('express');
const router = express.Router();
const {fetchAllPosts} = require('../service/postService');
const {fetchAllCategories} = require('../service/categoryService');
const {getBookmarkedPostIds} = require('../service/bookmarkService')

router.get("/", async (req, res) => {
    try{
        let posts = await fetchAllPosts();
        let categories = await fetchAllCategories();
        let bookmarkedPostIds = await getBookmarkedPostIds(req.user._id)
        res.render("home", {title: "blogStreet", posts:posts, categories: categories, bookmarkedPostIds: bookmarkedPostIds});
    }
    catch (error){
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;