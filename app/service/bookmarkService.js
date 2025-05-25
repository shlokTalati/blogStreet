const {Bookmark} = require('../model/bookmarkModel');


/**
 * Fetches all post IDs bookmarked by a specific user.
 * @param {String} user - ID of the user.
 * @returns {Array} - Array of bookmarked post IDs as strings.
 */
async function getBookmarkedPostIds(user) {
    const bookmarks = await Bookmark.find({ user: user });
    return bookmarks.map(b => b.post.toString());
}



module.exports = { getBookmarkedPostIds }