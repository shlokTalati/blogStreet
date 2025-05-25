let {renderCurrentUserProfile, renderUserProfile} = require('../controller/userController')
let express = require('express')
const {fetchPostsByUserId, fetchPostsByCategoryId} = require("../service/postService");
const {fetchAllCategories} = require("../service/categoryService");
const {getBookmarkedPostIds} = require("../service/bookmarkService");
const {renderUserBookmarks} = require('../controller/bookmarkController')
const {preparePostCardData} = require('../service/postCardService')
const {renderUserLikes} = require("../controller/likeController");

let router = express.Router()


router.get('/profile', renderCurrentUserProfile);

router.get('/my-posts', async (req, res)=>{
    let bookmarkedPostIds = getBookmarkedPostIds(req.user._id)
    const postCardData = await preparePostCardData(req.user._id, fetchPostsByUserId(req.user._id));

    res.render("my-posts", {title: "My Posts" , postCardData, categories: await fetchAllCategories(), bookmarkedPostIds})
});


router.get('/bookmarks', renderUserBookmarks);

router.get('/likes', renderUserLikes)

router.get('/settings', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
});

router.get('/:id', renderUserProfile)

module.exports = router;
