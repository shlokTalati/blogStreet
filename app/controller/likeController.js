const {Like} = require("../model/likeModel");
const {preparePostCardData} = require("../service/postCardService");
const {fetchPostsByCategoryId, fetchMultiplePostsByPostIds} = require("../service/postService");

async function toggleLike (req, res){

    if(req.body.isLiked === "false"){
        let like = new Like({user: req.user._id, post: req.body.postId})
        let data = await like.save()
        return res.status(200).json({message: "Like Saved"});
    }
    else{
        let deleteLike = await Like.findOneAndDelete({user: req.user._id, post: req.body.postId});
        if(!deleteLike){
            return res.status(404).json({message: "Like not found"});
        }
        return res.status(200).json({message: "Like Removed"})
    }
}

async function renderUserLikes (req, res){
    try {
        const likes = await Like.find({ user: req.user._id });
        const postIds = likes.map(like => like.post.toString())
        //Getting Post Ids of all Liked Posts in an array and then fetching them
        const postCardData = await preparePostCardData(req.user._id, fetchMultiplePostsByPostIds(postIds));

        res.render('likes.ejs', {
            title: 'My Liked Posts',
            postCardData
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error in Like Controller.');
    }
}

module.exports = {toggleLike, renderUserLikes}