const express = require("express");
const router = express.Router();

const {toggleLike} = require('../controller/likeController');

router.post('/toggle', toggleLike)


module.exports = router;