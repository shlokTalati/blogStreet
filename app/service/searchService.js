const {Post} = require('../model/postModel');
const {Category} = require('../model/categoryModel');
const {User} = require('../model/userModel');

async function getSearchData(query){
    // Use regular expressions for a case-insensitive search. You might need to fine-tune queries for production.
    const regex = new RegExp(query, "i");

    // Find matching posts, categories, and users. Limit results for performance.
    const postsPromise = Post.find({ title: regex }).limit(5);
    const categoriesPromise = Category.find({ name: regex }).limit(5);
    const usersPromise = User.find({ name: regex }).limit(5);

    const [posts, categories, users] = await Promise.all([
        postsPromise,
        categoriesPromise,
        usersPromise,
    ]);

    return { posts, categories, users };
}

module.exports = {getSearchData}