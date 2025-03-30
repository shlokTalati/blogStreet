const express = require("express");
const router = express.Router();
const {renderCategoryPage} = require('../controller/categoryController');


router.get("/:categoryId", renderCategoryPage);


module.exports = router;