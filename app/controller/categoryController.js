const {fetchPostsByCategoryId} = require('../service/postService');
const {fetchCategory} = require('../service/categoryService');
const {getBookmarkedPostIds} = require("../service/bookmarkService");

async function renderCategoryPage(req, res){
    // Req.params.categoryId

    let posts = await fetchPostsByCategoryId(req.params.categoryId);
    let category = await fetchCategory(req.params.categoryId);
    let bookmarkedPostIds = await getBookmarkedPostIds(req.user._id)
    res.render('category', {title: category.name ,posts: posts, category: category, bookmarkedPostIds: bookmarkedPostIds});

}


module.exports = {renderCategoryPage}