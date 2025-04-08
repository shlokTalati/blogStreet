const {Post} = require('../model/postModel');
const {validateAuthority, editPostById, deletePostById} = require('../service/postService');

async function newPost (req, res) {
    try {
        const { newPostTitle, newPostContent, newPostCategories } = req.body;

        const newPost = new Post({
            author: req.user._id,
            title: newPostTitle,
            content: newPostContent,
            categories: newPostCategories
        });

        let savedPost = await newPost.save();

        return res.redirect(`/post/${savedPost._id}`);
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deletePost(req, res) {
    let msg = "success";

    // Validate authority first
    if (await validateAuthority(req.params.postId, req.user._id) === false) {
        return res.send({ msg: "User doesn't have access to this function." });
    }

    try {
        const deletedPost = await deletePostById(req.params.postId);
        if (!deletedPost) {
            msg = "failed";
        }
        return res.redirect('/user/my-posts?msg=' + msg);
    } catch (error) {
        console.error("Error deleting post:", error);
        msg = "failed";
        return res.redirect('/user/my-posts?msg=' + msg);
    }
}

async function editPostController(req, res) {

    // Check if the current user is authorized to edit the post
    if (await validateAuthority(req.params.postId, req.user._id) === false) {
        return res.send({ msg: "User doesn't have access to this function." });
    }

    let msg = "success";

    const updatedData = req.body;
    try {
        const updatedPost = await editPostById(req.params.postId, updatedData);
        if (!updatedPost) {
            msg = "editfailed";
        }
        return res.redirect('/user/my-posts?msg=' + msg);
    } catch (error) {
        console.error("Error updating post:", error);
        msg = "editfailed";
        return res.redirect('/user/my-posts?msg=' + msg);
    }
}

module.exports = {newPost,  deletePost, editPostController}