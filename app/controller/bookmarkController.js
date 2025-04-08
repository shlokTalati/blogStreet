const {Bookmark} = require("../model/bookmarkModel");

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
        const bookmarks = await Bookmark.find({ user: req.user._id }).populate('post');

        const bookmarkedPosts = bookmarks.map(b => b.post);

        res.render('bookmarks.ejs', {
            title: 'My Bookmarks',
            posts: bookmarkedPosts,
            bookmarkedPostIds: bookmarkedPosts.map(post => post._id.toString())
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong.');
    }
}

module.exports = {toggleBookmark, renderUserBookmarks}