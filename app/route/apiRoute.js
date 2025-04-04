// routes/search.js
const express = require("express");
const router = express.Router();
const {Post} = require('../model/postModel')
const {Category} = require("../model/categoryModel");
const {User} = require("../model/userModel");

router.get("/search", async (req, res) => {
    console.log(req.query);
    const query = req.query.q;
    if (!query) {
        return res.json({ posts: [], categories: [], users: [] });
    }

    try {
        // Use regular expressions for a case-insensitive search. You might need to fine-tune queries for production.
        const regex = new RegExp(query, "i");

        // Find matching posts, categories, and users. Limit results for performance.
        const postsPromise = Post.find({ title: regex }).limit(5);
        const categoriesPromise = Category.find({ name: regex }).limit(5);
        const usersPromise = User.find({ name: regex }).limit(5);

        const [posts, categories, users] = await Promise.all([
            postsPromise,
            categoriesPromise,
            usersPromise,
        ]);

        res.json({ posts, categories, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
