const User = require('./models/user')
const Post = require('./models/post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {valid} = require('./mid/middleware')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})

exports.reg = async (req, res) => {
    const {error} = valid(req.body)
    if(error){
        return res.json({error: 'Enter data'})
    }
    const {name, email, password} = req.body
    const checkMailMatch = await User.findOne({email})
    if(checkMailMatch){
        return res.json({
            error: 'This user already exists, please enter a different email address'
        })
    }
    const hashPas = bcrypt.hashSync(password,10);
    const user = new User({name, email, password: hashPas, image: {
            public_id: "",
            url: ""
        }})
    await user.save()
    const token = jwt.sign({_id: user._id},
        'key',
        {expiresIn: '21d',}
    );
    console.log(user, token)
    return res.json({user,token})
}

exports.log = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.json({error: 'User is not found'})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if(!validPassword) {
        return res.json({error: 'Wrong password'})
    }
    const token = jwt.sign({_id: user._id},
        'key',
        {expiresIn: '7d',}
    );
    return res.json({user,token})
}

exports.getAllUsers = async(req,res) => {
    const users = await User.find()
    res.json(users)
}


exports.uploadImage = async (req,res) => {
    console.log('upload image >> user._id', req.user._id);
    try{
        const result = await cloudinary.uploader.upload(req.body.image);

        console.log('CLOUDINARY_RESULT', result);
        const user = await User.findByIdAndUpdate(req.user._id, {
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        },
            {new: true}
        );
        return res.json({
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        });
    }catch (err){
        console.log(err)
    }
}

exports.updateUser = async (req,res) => {
    try{
        const {name, email, password} = req.body
        if (name.length && email.length && password.length < 1) {
            return res.json({
                error: 'Enter data'
            })
        }else{
            const hashedPassword = bcrypt.hashSync(password,10);
            const user = await User.findByIdAndUpdate(
                req.user._id,
                {
                    name: name,
                    email: email,
                    password: hashedPassword
                });
            return res.json(user);
        }
    }catch (err){
        console.log(err);
    }
};

exports.userProfile = async (req,res) => {
    try{
        const profile = await User.findById(req.params.userId).select('name _id email image.url');
        const posts = await Post.find({postedBy: req.params.userId}).populate('postedBy', 'email image');
        console.log(profile)
        return res.json({profile, posts})
    }catch(err){
        console.log(err)
    }
}
module.exports.getAllUsers = async(req,res) => {
    const users = await User.find().select('name _id email image')
    res.json({users})
}
