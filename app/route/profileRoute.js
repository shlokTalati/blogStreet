let {renderProfile} = require('../controller/userController')
let express = require('express')
let router = express.Router()


router.get('/', renderProfile);

module.exports = router;
