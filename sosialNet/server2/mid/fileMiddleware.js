
const multer = require("multer");
const moment = require("moment");
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'files/')
    },
    filename(req, file, cb){
        const date = moment().format('SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

module.exports = multer({
    storage: storage
})