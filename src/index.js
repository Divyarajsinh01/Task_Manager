require('dotenv').config();
const path = require('path')

// const app = require('./app')

const port = process.env.PORT
console.log(process.env.PORT)


const express = require('express')
const app = express()
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')

app.use(express.json())
//export router from routes file


app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`server on ${port}`)
})


//upload images
// const multer = require('multer')

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {

//         //validate that file is pdf if not than it give error else it accept file

//         // if(!file.originalname.endsWith('.pdf')){
//         //     return cb(new Error('please upload a pdf file'))
//         // }
//         // cb(undefined, true)

//         //validate for doc or docx file

//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('please upload a document file'))
//         }
//         cb(undefined, true)
//     }
// })
// //provide another callback function to router to hendale error of multer 
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// },(error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

//middleware example

// app.use((req, res, next) => {
//     console.log(req.method, req.path)
// })

// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('get req disabled')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('site is under maintanance')
// })

//creating user endpoints 

// app.post('/users', (req, res) => {
//     const user = new User(req.body)

//     user.save().then((user)=>{
//         res.send(user)
//     }).catch((error)=> {
//         // console.log(error)
//         // res.send(error)
//         res.status(400).send(error)
//     })

//     // res.send('testing!!')

//     // console.log(req.body)
// })


// //reading user 
// app.get('/users',(req, res) => {
//     User.find({}).then((user) => {
//         res.send(user)
//     }).catch((error) => {
//         res.status(400).send(e)
//     })
// })

// //reading user with id
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id

//     User.findById(_id).then((user) => {
//         if(!user){
//            return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })




//authantication basics
// const bcrypt = require('bcryptjs')

//jsonwebtoken
// const jwt = require('jsonwebtoken')

// const userValid = async () => {

//     const token = jwt.sign({_id: "abc123"}, "thisisnodejscource", {expiresIn: "2hours"})
//     // console.log(token)
//     const data = jwt.verify(token, "thisisnodejscource")
//     console.log(data)

//         // const pass = 'Rahul@123'
//         // const hashPass = await bcrypt.hash(pass, 8)

//         // console.log(pass)
//         // console.log(hashPass)

//         // const passValid = await bcrypt.compare("Rahul@123", hashPass)
//         // console.log(passValid)
// }

// userValid()

// const main = async () => {
//     // const task = await Task.findById('653f87a3665b583e1ff581e8')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById("653f874b24481ee0a0347d19")
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()
