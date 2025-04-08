let {renderProfile} = require('../controller/userController')
let express = require('express')
const {fetchPostsByUserId} = require("../service/postService");
const {fetchAllCategories} = require("../service/categoryService");
const {getBookmarkedPostIds} = require("../service/bookmarkService");
const {renderUserBookmarks} = require('../controller/bookmarkController')
let router = express.Router()


router.get('/profile', renderProfile);

router.get('/my-posts', async (req, res)=>{
    let bookmarkedPostIds = await getBookmarkedPostIds(req.user._id)
    res.render("my-posts", {title: "My Posts" ,posts: await fetchPostsByUserId(req.user._id), categories: await fetchAllCategories(), bookmarkedPostIds})
});


router.get('/bookmarks', renderUserBookmarks);
router.get('/settings', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
});

router.get('/:userId', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
})

module.exports = router;
