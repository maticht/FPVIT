const Router = require('express')
const router = new Router()
// const controller = require('./controller')
// const {viewAllUsersAuth} = require('./mid/middleware')
const load = require('./mid/fileMiddleware')
const jwt = require("express-jwt");
const checkJwt = jwt({secret: 'key', algorithms:['HS256']})
const {
    updateUser,
    uploadImage,
    log,
    reg,
    getAllUsers,
    getUsersByEmail,
    deleteUsersByEmail,
    overwriteUsersByEmail
} = require('./controller');



router.post('/reg',reg)
    .post('/log',log)
    .post('/upload-image', checkJwt, uploadImage)
    .post('/update-password', checkJwt, updateUser)
    .get('/1',getAllUsers)
    .get('/:email',getUsersByEmail)
    .delete('/:email',deleteUsersByEmail)
    .put('/:email', load.single('file'),overwriteUsersByEmail)

module.exports = router