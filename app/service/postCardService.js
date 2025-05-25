const { getBookmarkedPostIds } = require("./bookmarkService");
const {fetchAllCategories} = require('./categoryService');
const {getLikedPostIds} = require("./likeService");

/**
 * Prepares post card data including posts, categories, bookmarked post IDs, and liked post IDs.
 *
 * @param {string} userId - ID of the current user (used to fetch bookmarks and likes).
 * @param {Promise<Array>} getPostFunction - Awaited function that returns an array of posts
 *                                           (can be all posts, bookmarked posts, etc.).
 * @returns {Promise<Object>} An object containing:
 *                            - posts: Array of post documents
 *                            - categories: Array of category documents
 *                            - bookmarkedPostIds: Array of bookmarked post IDs as strings
 *                            - likedPostIds: Array of liked post IDs as strings
 */
async function preparePostCardData(userId, getPostFunction) {
    let posts = await getPostFunction;
    let categories = await fetchAllCategories();
    let bookmarkedPostIds = await getBookmarkedPostIds(userId);
    let likedPostIds = await getLikedPostIds(userId);
    return { posts, categories, bookmarkedPostIds, likedPostIds };
}



module.exports = {
    preparePostCardData
};