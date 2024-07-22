require('dotenv').config();

const mongoose = require('mongoose')
const validator = require('validator')
// const { use } = require('../routes/task')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// use validate in monggose

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email :{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('please provide valid email')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value) {
            if(value < 0){
              throw new Error('please provide valid age')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate (password){
              if(password.toLowerCase().includes('password')){
                throw new Error('password is invalid')
                // return false
              }
        }
    },
    userProfile:{
        type: String
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

//public frofile remove password and tokens wehen login in
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    // console.log(user)

    delete userObject.password
    delete userObject.tokens
    delete userObject.userProfile
    // console.log(userObject)
    return userObject
}


//JsonwebToken
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

//middleware
userSchema.statics.findByCredentials = async(email, password) => {
        const user = await User.findOne({email})

        if(!user){
            throw new Error('unable to login')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error('unable to login')
        }

        return user
}

//hash password before saving

userSchema.pre('save', async function (next) {
    const user = this
    
    // if(user.isModified('password')){
    //    user.password = await bcrypt.hash(user.password, 8)
    // }
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    // console.log('update')

    next()
})

// userSchema.pre('remove', async function (next) {
//     const user = this;
//     console.log('Removing user with ID:', user._id);
//     await Task.deleteMany({ owner: user._id });
//     console.log('Tasks removed for user with ID:', user._id);
//     next();
// });


const User = mongoose.model('user', userSchema)

module.exports = User