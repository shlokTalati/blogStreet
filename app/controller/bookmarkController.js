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
            /* Example of Bookmarks Array Constant
    [
        {
            _id: new ObjectId('6832c15ef89e506cf5681d94'),
            user: new ObjectId('682b327830603e9d2cdcf9d0'),
            post: {
                _id: new ObjectId('682b324fc5f8361783406cd4'),
                author: new ObjectId('682b324fc5f8361783406cc0'),
                title: 'The Rise of AI in Everyday Technology',
                content: 'Artificial Intelligence is transforming our daily gadgets, from smart assistants to predictive algorithms. This post explores the impact of AI on consumer technology and what the future holds.',
                categories: [Array],
                imageUrls: [],
                likes: [],
                createdAt: 2025-05-19T13:29:51.176Z,
        __v: 0
    },
    createdAt: 2025-05-25T07:06:06.618Z,
        __v: 0
    }
    ]
    */

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