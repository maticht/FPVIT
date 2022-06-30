const express = require('express')
const router = express.Router();
const jwt = require("express-jwt");
const checkJwt = jwt({secret: 'key', algorithms:['HS256']})
const {create, view, like, unlike} = require("./postsController");

router.post('/create', checkJwt, create);
router.get('/',view);
router.put('/like', checkJwt, like);
router.put('/unlike', checkJwt, unlike);

module.exports = router;