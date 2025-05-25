const { fetchAllPosts } = require("./postService");
const { getBookmarkedPostIds } = require("./bookmarkService");
const {fetchAllCategories} = require('./categoryService');

// UserId parameter will be of loggedIn User, and getPostFunction param for whatever Posts are required. For eg, fetchAllPosts() will be used in home page where all posts are required, and some other function will be used where a particular type of posts are required
async function preparePostCardData(userId, getPostFunction) {
    let posts = await getPostFunction;
    let categories = await fetchAllCategories();
    let bookmarkedPostIds = await getBookmarkedPostIds(userId)
    return { posts, categories, bookmarkedPostIds };
}



module.exports = {
    preparePostCardData
};