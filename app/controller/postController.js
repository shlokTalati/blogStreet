const {Post} = require('../model/postModel');

async function fetchAllPosts(){
    try {
        return await Post.find().populate("author", "name").sort({createdAt: -1}); // Returns all the Posts as result of this function. Eg. let POSTS = fetchPost().
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchPostByPostId(postId){
    try {
        return await Post.findById(postId).populate("author", "name"); // Return Post by ID
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchPostsByUserId(userId){
    try {
        return await Post.find({author: userId}).sort({ createdAt: -1 });
    } catch (err) {
        console.error(err);
        return null;
    }
}


async function newPost (req, res) {
    console.log("NEW POST REQUEST RECEIVED: " + req.body);
    try {
        const { newPostTitle, newPostContent } = req.body;

        const newPost = new Post({
            author: req.user._id,
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

async function deletePostById(postId) {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return false;
        }
        return true; // Returns true if Post is deleted

    } catch (error) {
        console.error("Error deleting post:", error);
        return false;
    }
}

async function editPostById(postId, updatedData) {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: updatedData },
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedPost) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error updating post:", error);
        return false;
    }
}




module.exports = {fetchAllPosts, fetchPostByPostId, fetchPostsByUserId, newPost,  deletePostById, editPostById}