const {Post} = require("../model/postModel");

async function validateAuthority(postId, userId){ //Returns false if user not the owner of the post
    let post = await Post.findById(postId);

    if(post.author.toString() !== userId){
        return false;
    }
    return true;
}

async function fetchPostByPostId(postId){
    try {
        return await Post.findById(postId).populate("author", "name"); // Return Post by ID
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchAllPosts(){
    try {
        return await Post.find().populate("author", "name").sort({createdAt: -1}); // Returns all the Posts as result of this function. Eg. let POSTS = fetchPost().
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

async function editPostById(postId, updatedData) {
    try {
        return await Post.findByIdAndUpdate(
            postId,
            {$set: updatedData},
            {new: true, runValidators: true} // Returns the updated document
        );
    } catch (error) {
        throw error;
    }
}

async function deletePostById(postId) {
    try {
        return await Post.findByIdAndDelete(postId);  // returns the deleted post document or null if not found
    } catch (error) {
        throw error; // Let the controller handle errors
    }
}

module.exports = {validateAuthority, editPostById, deletePostById, fetchAllPosts, fetchPostByPostId, fetchPostsByUserId}
