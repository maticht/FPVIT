
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {valid} = require('./mid/middleware')

function generateToken(password){
    return jwt.sign({password}, 'key');
}

module.exports.reg = async (req, res) => {
    const {error} = valid(req.body)
    if(error){
        return res.json({
            error: 'Enter data'
        })
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
    const user = new User({name, email, password: hashPas, fileSrc})
    await user.save()
    const token = generateToken(user.password)
    console.log('good' + res.status)
    console.log(user, token)
    return res.json({user,token})
}

module.exports.log = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.json({
            error: 'User is not found'
        })
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if(!validPassword) {
        return res.json({
            error: 'Wrong password'
        })
    }
    const token = generateToken(user.password)
    return res.json({user,token})
}

module.exports.getAllUsers = async(req,res) => {
    const users = await User.find()
    res.json(users)
}

module.exports.getUsersByEmail = async(req,res) => {
    const user = await User.find({email: req.params.email})
    res.json(user)
}

module.exports.deleteUsersByEmail = async(req,res) => {
    await User.deleteOne({email: req.params.email})
    res.end(`User with id ${req.params.email} has been deleted`)
}

module.exports.overwriteUsersByEmail = async(req,res) => {
    const {error} = valid(req.body)
    if(error){
        res.end('Enter data')
    }
    await User.updateOne({email: req.params.email},
        {$set: req.body} )
    res.end('Users has been overwritten')
}