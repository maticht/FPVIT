const Post = require('./models/post');
const User = require('./models/user');
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})

exports.create = async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.body.image);
        console.log('CLOUDINARY_RESULT', result);
        const post = await new Post({...req.body, postedBy: req.user._id, image: {
                public_id: result.public_id,
                url: result.secure_url,
            }}).save();
        res.json(post);
    }catch(err){
        console.log(err)
    }
}

exports.view = async (req, res) => {
    try{
        const all = await Post.find().populate('postedBy', 'email image')
        res.json(all)
    }catch (err){
        console.log(err)
    }
}

exports.like = async (req, res) => {
    try{
        const like = await Post.findByIdAndUpdate(req.body.ObjectId, {
            $addToSet: {likes: req.user._id},
        }, {new: true});
        res.json(like)
    }catch (err){
        console.log(err)
    }
}

exports.unlike = async (req, res) => {
    try{
        const like = await Post.findByIdAndUpdate(req.body.ObjectId, {
            $addToSet: {likes: req.post._id},
        }, {new: true});
        res.json(like)
    }catch (err){
        console.log(err)
    }
}