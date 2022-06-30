const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {valid} = require('./mid/middleware')
const cloudinary = require('cloudinary')
const moment = require("moment");
const axios = require("axios");
// const {nanoid} = require("nanoid")

cloudinary.config({
    cloud_name: 'maticht12345',
    api_key: '296937641242215',
    api_secret: '1Pz4aF1QxcosM4hU6fwRS2bwlWY'
})

// function generateToken(_id){
//     return jwt.sign({ _id: user._id }, 'key');
// }

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

exports.reg = async (req, res) => {
    const {error} = valid(req.body)
    if(error){
        return res.json({error: 'Enter data'})
    }
    const {name, email, password} = req.body
    const fileSrc = req.file ? req.file.path : ''
    const checkMailMatch = await User.findOne({email})
    if(checkMailMatch){
        return res.json({
            error: 'This user already exists, please enter a different email address'
        })
    }
    const hashPas = bcrypt.hashSync(password,10);
    const user = new User({name, email, password: hashPas, fileSrc, image: {
            public_id: "",
            url: ""
        }})
    await user.save()
    const token = jwt.sign({_id: user._id},
        'key',
        {expiresIn: '7d',}
    );
    console.log('good' + res.status)
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

exports.getUsersByEmail = async(req,res) => {
    const user = await User.find({email: req.params.email})
    res.json(user)
}

exports.deleteUsersByEmail = async(req,res) => {
    await User.deleteOne({email: req.params.email})
    res.end(`User with id ${req.params.email} has been deleted`)
}

exports.overwriteUsersByEmail = async(req,res) => {
    await User.updateOne({email: req.params.email},
        {$set: {name: req.body.name, email: req.body.email}})
    res.end('Users has been overwritten')
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
        console.log(err)
    }

}
