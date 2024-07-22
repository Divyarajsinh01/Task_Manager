const mongoose = require('mongoose')
const validator = require('validator')


//validation

const taskSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
},{
    timestamps: true
})

const Task = mongoose.model('task', taskSchema)

module.exports = Task