const express = require('express')
const app = express()
require('./db/mongoose')

const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')

//export router from routes file


app.use(userRouter)
app.use(taskRouter)

module.exports = app