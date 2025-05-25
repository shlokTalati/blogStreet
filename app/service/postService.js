const { Post } = require("../model/postModel");

/**
 * Checks if the given user is the author of the specified post.
 * @param {String} postId - ID of the post.
 * @param {String} userId - ID of the user.
 * @returns {Boolean} - Returns true if user is the author, false otherwise.
 */
async function validateAuthority(postId, userId) {
    let post = await Post.findById(postId);
    if (post.author.toString() !== userId) {
        return false;
    }
    return true;
}

/**
 * Fetches all posts, sorted by creation date (newest first),
 * with author names and category names populated.
 * @returns {Array} - Array of populated post documents.
 */
async function fetchAllPosts() {
    try {
        return await Post.find().populate("author", "name").populate("categories", "name").sort({ createdAt: -1 });
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Fetches a single post by its ID, with author and categories populated.
 * @param {String} postId - ID of the post to fetch.
 * @returns {Object|null} - The populated post document or null if not found.
 */
async function fetchPostByPostId(postId) {
    try {
        return await Post.findById(postId).populate("author", "name").populate("categories", "name");
    } catch (err) {
        console.error(err);
        return null;
    }
}


/**
 * Fetches multiple posts based on an array of post IDs.
 *
 * @param {Array} postIds - Array of post ObjectIds to fetch.
 * @returns {Array} Array of populated post documents, sorted by newest first.
 */
async function fetchMultiplePostsByPostIds(postIds) {
    return await Post.find({ _id: { $in: postIds } })
        .populate("author", "name")          // Populate author's name
        .populate("categories", "name")      // Populate category names
        .sort({ createdAt: -1 });            // Sort posts by creation date (newest first)
}

/**
 * Fetches all posts created by a specific user, sorted by newest first.
 * @param {String} userId - ID of the author.
 * @returns {Array|null} - Array of populated post documents or null.
 */
async function fetchPostsByUserId(userId) {
    try {
        return await Post.find({ author: userId }).populate("author", "name").populate("categories", "name").sort({ createdAt: -1 });
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Fetches all posts under a specific category, sorted by newest first.
 * @param {String} categoryId - ID of the category.
 * @returns {Array|null} - Array of populated post documents or null.
 */
async function fetchPostsByCategoryId(categoryId) {
    try {
        return await Post.find({ categories: categoryId }).populate("author", "name").populate("categories", "name").sort({ createdAt: -1 });
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Edits an existing post using its ID and the updated fields.
 * @param {String} postId - ID of the post to update.
 * @param {Object} updatedData - Object containing updated fields from frontend.
 * @returns {Object} - The updated post document.
 */
async function editPostById(postId, updatedData) {
    let mappedData = {
        title: updatedData.editTitle,
        content: updatedData.editContent,
        categories: updatedData.editCategories
    }

    try {
        return await Post.findByIdAndUpdate(
            postId,
            { $set: mappedData },
            { new: true, runValidators: true }
        );
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a post by its ID.
 * @param {String} postId - ID of the post to delete.
 * @returns {Object|null} - The deleted post document or null if not found.
 */
async function deletePostById(postId) {
    try {
        return await Post.findByIdAndDelete(postId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    validateAuthority,
    editPostById,
    deletePostById,
    fetchAllPosts,
    fetchPostByPostId,
    fetchPostsByUserId,
    fetchPostsByCategoryId,
    fetchMultiplePostsByPostIds
}