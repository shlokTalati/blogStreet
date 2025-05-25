const {Like} = require('../model/likeModel');


/**
 * Fetches all post IDs liked by a specific user.
 * @param {String} user - ID of the user.
 * @returns {Array} - Array of Liked post IDs as strings.
 */
async function getLikedPostIds(user) {
    const like = await Like.find({ user: user });
    return like.map(l => l.post.toString());
}



module.exports = { getLikedPostIds }