const express = require("express");
const router = express.Router();

const {toggleBookmark} = require('../controller/bookmarkController');

router.post('/toggle', toggleBookmark)


module.exports = router;