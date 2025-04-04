const {getSearchData} = require('../service/searchService')

async function  sendSearchResult(req, res){
    const query = req.query.q;
    if (!query) {
        return res.json({ posts: [], categories: [], users: [] });
    }

    try {
        res.json(await getSearchData(query));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}


module.exports = { sendSearchResult };