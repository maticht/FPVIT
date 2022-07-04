const Router = require('express');
const router = new Router();
const jwt = require("express-jwt");
const checkJwt = jwt({secret: 'key', algorithms:['HS256']});
const {getAllUsers, userProfile, updateUser, uploadImage, log, reg,} = require('./controller');

router.post('/reg',reg)
    .post('/log',log)
    .post('/upload-image', checkJwt, uploadImage)
    .post('/update-password', checkJwt, updateUser)
    .get('/user-profile/:userId/', userProfile)
    .get('/getAllUsers',getAllUsers)

module.exports = router