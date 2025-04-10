const {User} = require("../model/userModel");
const {Post} = require("../model/postModel");
const {getBookmarkedPostIds} = require("../service/bookmarkService");

function renderCurrentUserProfile(req, res){
    res.render("profile", {
        title: "User Profile",
        }
    )
}

function updateProfile(req, res){

}

async function renderUserProfile(req, res){
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ author: user._id });
    let bookmarkedPostIds = await getBookmarkedPostIds(req.params.id)

    res.render('user.ejs', {title: user.name + "'s Posts" , user, posts,  bookmarkedPostIds});
}


module.exports = {renderCurrentUserProfile, renderUserProfile};