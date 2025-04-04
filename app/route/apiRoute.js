// routes/search.js
const express = require("express");
const router = express.Router();
const {Post} = require('../model/postModel')
const {Category} = require("../model/categoryModel");
const {User} = require("../model/userModel");
const {sendSearchResult} = require('../controller/searchController')

router.get("/search", sendSearchResult);

module.exports = router;
