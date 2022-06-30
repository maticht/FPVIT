const mongoose = require('mongoose')
const {string} = require("joi");
const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fileSrc: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: "Subscriber"
    },
    image: {
        public_id: "",
        url: ""
    }
})
module.exports = mongoose.model('user', User)
