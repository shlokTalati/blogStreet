const {fetchCategory} = require('../service/categoryService');
const {preparePostCardData} = require('../service/postCardService')
const { fetchPostsByCategoryId } = require('../service/postService')

async function renderCategoryPage(req, res){
    // Req.params.categoryId

    let category = await fetchCategory(req.params.categoryId);
    const postCardData = await preparePostCardData(req.user._id, fetchPostsByCategoryId(req.params.categoryId));
    res.render('category', {title: category.name, category, postCardData});
}


module.exports = {renderCategoryPage}