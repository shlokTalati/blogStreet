let express = require('express')
const {renderUserBookmarks} = require('../controller/bookmarkController')
const {renderUserLikes} = require("../controller/likeController");
const {renderUserProfile, renderMyPostsPage, renderCurrentUserProfile} = require('../controller/userController')

let router = express.Router()

router.get('/profile', renderCurrentUserProfile);

router.get('/my-posts', renderMyPostsPage);

router.get('/bookmarks', renderUserBookmarks);

router.get('/likes', renderUserLikes)

router.get('/settings', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
});

router.get('/:id', renderUserProfile)

module.exports = router;
