const {Post} = require('../model/postModel');

async function fetchAllPosts(){
    try {
        return await Post.find().populate("author", "name").sort({createdAt: -1}); // Returns all the Posts as result of this function. Eg. let POSTS = fetchPost().
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function newPost (req, res) {
    console.log("NEW POST REQUEST RECEIVED: " + req.body);
    try {
        const { newPostTitle, newPostContent } = req.body;

        // Ensure user is authenticated before creating a post
        if (!req.user || !req.user.id) {
            return res.redirect('/auth?msg=invalidcredentials');
        }

        const newPost = new Post({
            author: req.user.id,
            title: newPostTitle,
            content: newPostContent
        });

        let savedPost = await newPost.save();

        return res.redirect(`/post/${savedPost._id}`);
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function fetchPostById(postId){
    try {
        return await Post.findById(postId).populate("author", "name"); // Return Post by ID
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {fetchAllPosts, newPost, fetchPostById}