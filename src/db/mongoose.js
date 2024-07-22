require('dotenv').config();

const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL)

//user collection using mongoose

// const User = mongoose.model('user',{
//     name: {
//         type: String
//     },
//     age:{
//         type: Number
//     }
// })

// const data = new User({
//     name: 'raj',
//     age: 22
// })

// data.save().then(()=>{
//     console.log(data)
// }).catch((error)=>{
//     console.log("error")
// })


//task collection using mongoose

// const task = mongoose.model('task', {
//     desc: {
//         type: String
//     },
//     complete: {
//         type: Boolean
//     }
// })



//store single doc in collection , save- use to store single docs+


// const data = new task({
//     desc: 'clean house',
//     complete: true
// })


// data.save().then(() => {
//     console.log(data)
// }).catch((error) => {
//     console.log(error)
// })



//store multiple-docs in collection, inserMany- use store mult-docs

// const data = [
//     {
//         desc: 'clean-some',
//         complete: false
//     },
//     {
//         desc: 'car-wash',
//         complete: true
//     }
// ];

// task.insertMany(data).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


//use validate in monggose

// const User = mongoose.model('user',{
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email :{
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('please provide valid email')
//             }
//         }
//     },
//     age:{
//         type: Number,
//         default:0,
//         validate(value) {
//             if(value < 0){
//               throw new Error('please provide valid age')
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 7,
//         trim: true,
//         validate (password){
//               if(password.toLowerCase().includes('password')){
//                 throw new Error('password is invalid')
//                 // return false
//               }
//         }
//     }
// })


// const data = new User({
//     name: 'viraj',
//     email: 'viraj@email.com',
//     password: 'password123'
// })

// data.save().then(()=>{
//     console.log(data)
// }).catch((error) => {
//     console.log('error', error.message)
// })

//validation
// const task = mongoose.model('task', {
//     desc: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     complete: {
//         type: Boolean,
//         default: false
//     }
// })


// const data = new task({
//     desc: '     debug code'
// })


// data.save().then(() => {
//     console.log(data)
// }).catch((error) => {
//     console.log(error)
// })