let {renderProfile} = require('../controller/userController')
let express = require('express')
const {fetchPostsByUserId} = require("../service/postService");
const {fetchAllCategories} = require("../service/categoryService");
let router = express.Router()


router.get('/profile', renderProfile);

router.get('/my-posts', async (req, res)=>{
    res.render("my-posts", {title: "My Posts" ,posts: await fetchPostsByUserId(req.user._id), categories: await fetchAllCategories()})
});


router.get('/bookmarks', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
});
router.get('/settings', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
});

router.get('/:userId', (req, res)=>{
    return res.render('under-development.ejs', {title: "blogStreet"})
})

module.exports = router;
