const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Post = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        public_id: "",
        url: ""
    },
    postedBy: {
        type: ObjectId,
        ref: 'user',
    },
    likes: [{
        type: ObjectId,
        ref: 'user'
    }],
},
    {timestamps: true}
);

module.exports = mongoose.model('Post', Post)