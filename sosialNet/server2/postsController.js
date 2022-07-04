const Post = require('./models/post');
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})

exports.create = async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.body.image);
        const post = await new Post({
            ...req.body,
            postedBy: req.user._id, image: {
                public_id: result.public_id,
                url: result.secure_url,
            }}).save();
        let extendedPost = await post.populate('postedBy', 'email image')
        res.json(extendedPost);
    }catch(err){
        console.log(err);
    }
}

exports.view = async (req, res) => {
    try{
        const all = await Post.find().populate('postedBy', 'email image');
        res.json(all);
    }catch (err){
        console.log(err);
    }
}

exports.like = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $addToSet: {likes: req.user._id},
        }, {new: true});
        const extendedPost = await post.populate('postedBy', 'email image');
        res.json(extendedPost);
    }catch (err){
        console.log(err);
    }
}

exports.unlike = async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id},
        }, {new: true});
        const extendedPost = await post.populate('postedBy', 'email image');
        res.json(extendedPost);
    }catch (err){
        console.log(err);
    }
}

exports.postDelete = async (req, res) => {
    try{
        let a = req.params.postId.slice(1)
        const post = await Post.findById(a).select('postedBy');
        if(post.postedBy._id.toString() === req.user._id){
            const deleted = await Post.findByIdAndRemove(a);
            res.json(`DELETED SACSESS ${deleted}`);
        }
    }catch (err){
        console.log(err);
    }
}