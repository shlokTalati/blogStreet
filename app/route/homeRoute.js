const express = require('express');
const router = express.Router();
const {renderHomePage} = require('../controller/homeController');


router.get("/", renderHomePage);

module.exports = router;