const {Bookmark} = require('../model/bookmarkModel');


// Returns array of post ids that are bookmarked by the user
async function getBookmarkedPostIds(user) {
const bookmarks = await Bookmark.find({ user: user });
    return bookmarks.map(b => b.post.toString());
}



module.exports = { getBookmarkedPostIds }