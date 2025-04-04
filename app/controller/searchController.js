const Post = require('../model/postModel');
const Category = require('../model/categoryModel');
const User = require('../model/userModel');

async function sendSearchResults(req, res){
    return res.send(req.params)
}


module.exports = { sendSearchResults };