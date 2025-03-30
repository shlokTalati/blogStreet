const {fetchPostsByCategoryId} = require('../service/postService');
const {fetchCategory} = require('../service/categoryService');

async function renderCategoryPage(req, res){
    // Req.params.categoryId

    let posts = await fetchPostsByCategoryId(req.params.categoryId);
    let category = await fetchCategory(req.params.categoryId);
    res.render('category', {title: category.name ,posts: posts, category: category});

}


module.exports = {renderCategoryPage}