const {Bookmark} = require("../model/bookmarkModel");
const {preparePostCardData} = require("../service/postCardService");
const {fetchPostsByCategoryId, fetchMultiplePostsByPostIds} = require("../service/postService");

async function toggleBookmark (req, res){

    if(req.body.isBookmarked === "false"){
        let bookmark = new Bookmark({user: req.user._id, post: req.body.postId})
        let data = await bookmark.save()
        return res.status(200).json({message: "Bookmark Saved"});
    }
    else{
        let deleteBookmark = await Bookmark.findOneAndDelete({user: req.user._id, post: req.body.postId});
        if(!deleteBookmark){
            return res.status(404).json({message: "Bookmark not found"});
        }
        return res.status(200).json({message: "Bookmark Removed"})
    }
}

async function renderUserBookmarks (req, res){
        try {
            const bookmarks = await Bookmark.find({ user: req.user._id });
            const postIds = bookmarks.map(bookmark => bookmark.post.toString())
            //Getting Post Ids of all Bookmarked Posts in an array and then fetching them
            const postCardData = await preparePostCardData(req.user._id, fetchMultiplePostsByPostIds(postIds));

            res.render('bookmarks.ejs', {
                title: 'My Bookmarks',
                postCardData
            });
        } catch (err) {
        console.error(err);
        res.status(500).send('Error in Bookmark Controller.');
    }
}

module.exports = {toggleBookmark, renderUserBookmarks}