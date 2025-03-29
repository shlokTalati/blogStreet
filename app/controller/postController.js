const {Post} = require('../model/postModel');

async function validateAuthority(postId, userId){ //Returns false if user not the owner of the post
    let post = await Post.findById(postId);

    if(post.author.toString() !== userId){
        return false;
    }
    return true;
}

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

async function deletePostById(req, res) {

    let msg = "success";
    if(await validateAuthority(req.params.postId, req.user._id) === false){
        return res.send({msg: "User doesn't have access to this function."})
    }
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);
        if (!deletedPost) {
            msg = "failed"
        }
        res.redirect('/user/my-posts?msg=' + msg);
    } catch (error) {
        console.error("Error deleting post:", error);
        msg = "failed"
        res.redirect('/user/my-posts?msg=' + msg);
    }
}

async function editPostById(req, res) {

    let msg = "success";

    if(await validateAuthority(req.params.postId, req.user._id) === false){
        return res.send({msg: "User doesn't have access to this function."})
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: updatedData },
            { new: true, runValidators: true } // Returns the updated document
        );

        if (!updatedPost) {
            msg="editfailed"
        }
        return res.redirect('/user/my-posts?msg=' + temp);
    } catch (error) {
        console.error("Error updating post:", error);
        msg="editfailed"
        return res.redirect('/user/my-posts?msg=' + temp);
    }
}

module.exports = {fetchAllPosts, fetchPostByPostId, fetchPostsByUserId, newPost,  deletePostById, editPostById}