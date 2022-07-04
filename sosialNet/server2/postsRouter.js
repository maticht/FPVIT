const express = require('express');
const router = express.Router();
const jwt = require("express-jwt");
const checkJwt = jwt({secret: 'key', algorithms:['HS256']});
const {postDelete, create, view, like, unlike} = require("./postsController");

router.post('/create', checkJwt, create)
    .get('/',view)
    .put('/like', checkJwt, like)
    .put('/unlike', checkJwt, unlike)
    .delete('/post-delete/:postId', checkJwt, postDelete)

module.exports = router;