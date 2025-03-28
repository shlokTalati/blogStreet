let {renderProfile} = require('../controller/userController')
let express = require('express')
const {fetchPostsByUserId} = require("../controller/postController");
let router = express.Router()


router.get('/profile', renderProfile);

router.get('/my-posts', async (req, res)=>{
    res.render("my-posts", {title: "My Posts" ,posts: await fetchPostsByUserId(req.user._id)})
});


router.get('/bookmarks', renderProfile);
router.get('/settings', renderProfile);

router.get('/:userId', (req, res)=>{

})

module.exports = router;
