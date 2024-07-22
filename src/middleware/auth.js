require('dotenv').config();

const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token })
        //console.log(user)

        if(!user){
            throw new Error()
        }

        req.token = token
        // console.log(req.token = token)
        req.user = user

        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({error: 'Authentication required'})
    }
    // console.log('auth token')
    
}

module.exports = auth