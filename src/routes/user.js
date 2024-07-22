const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { route } = require('./task')
const Task = require('../models/task')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const {welcomeEmail, canceltionEmail} = require('../emails/account')

const router = express.Router()

// creating user with async-await

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        welcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//login user

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error.message)
    }
})

//logout user

router.post('/users/logout', auth, async (req, res) => {
    try {
        if (req.user) {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })

            await req.user.save()
            res.send('logout sucessful')
        } else {
            res.status(401).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        // res.status(500).send(error.message)
        console.log(error.message)
    }
})


//reading user 
// router.get('/users', auth, async (req, res) => {
//     try{
//        const user = await User.find()
//        res.send(user)
//     }catch (e){
//          res.status(400).send()
//     }
// })

//read sigle user profile

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


//reading user with id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})
//updated user with id

// router.patch('/users/:id', async(req, res) => {

//     const updates = Object.keys(req.body)
//     const allowupdate = ['name', 'id', 'age', 'password', 'email']
//     const isValidation = updates.every((update)=>{
//         return allowupdate.includes(update)
//     })

//     if(!isValidation){
//         return res.status(400).send({error: "invalid updates!"})
//     }

//     try {

//         const user = await User.findById(req.params.id)
//         updates.forEach((update)=> {
//             user[update] = req.body[update]
//         })

//         await user.save()

//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(error)
//     }

// })

//update user with auth token

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowupdate = ['name', 'id', 'age', 'password', 'email']
    const isValidation = updates.every((update)=>{
        return allowupdate.includes(update)
    })

    if(!isValidation){
        return res.status(400).send({error: "invalid updates!"})
    }


    try {

        updates.forEach((update)=> {
            req.user[update] = req.body[update]
        })

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete user

// router.delete('/users/:id', async(req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if(!user){
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.delete('/users/me', auth, async (req, res) => {
    try {
        await Task.deleteMany({owner: req.user._id})
        await req.user.deleteOne()
        canceltionEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


//upload user images

const storage = multer.diskStorage({
    destination : 'avatar',
    filename(req, file, cb){
        // cb(null, file.fieldname + Date.now() + '_' + path.extname(file.originalname))
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|png|jpeg)/)){
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }
})

router.use('/', express.static('avatar'))

router.post('/users/me/avatars', auth, upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        throw new Error('Please upload an image');
    }
    // req.user.userProfile = req.file.buffer
    // const buffer = await sharp(req.file.filename).resize({width:250, height:250}).png()
    // req.user.userProfile = buffer

    req.user.userProfile = `http://localhost:3000/${req.file.originalname}`

    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.status(400).send({error: error.message})
})

//delete user profile
router.delete('/users/me/avatars', auth, async(req, res) => {
   req.user.userProfile = undefined 
   await req.user.save()
   res.send()
})

//get userProfile
router.get('/users/:id/avatars', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.userProfile){
            throw new Error()
        }

        res.send(user.userProfile)

    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router
