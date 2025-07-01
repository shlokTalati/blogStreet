const {User} = require("../model/userModel");
const {Post} = require("../model/postModel");
const {getBookmarkedPostIds} = require("../service/bookmarkService");
const {preparePostCardData} = require("../service/postCardService");
const {fetchPostsByCategoryId, fetchPostsByUserId} = require("../service/postService");
const {fetchAllCategories} = require("../service/categoryService");

function renderCurrentUserProfile(req, res){
    res.render("profile", {
        title: "User Profile",
        }
    )
}

async function renderMyPostsPage(req, res){
        let bookmarkedPostIds = getBookmarkedPostIds(req.user._id)
        const postCardData = await preparePostCardData(req.user._id, fetchPostsByUserId(req.user._id));

        res.render("my-posts", {title: "My Posts" , postCardData, categories: await fetchAllCategories(), bookmarkedPostIds})
}

function updateProfile(req, res){

}

async function renderUserProfile(req, res){
    const user = await User.findById(req.params.id);
    const postCardData = await preparePostCardData(req.user._id, fetchPostsByUserId(req.params.id));

    res.render('user.ejs', {title: user.name + "'s Posts" , user, postCardData});
}


module.exports = {renderCurrentUserProfile, renderUserProfile, renderMyPostsPage};