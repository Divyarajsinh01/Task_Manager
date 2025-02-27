const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

//creating task endpoint
router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

//reading task

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.complete) {
        match.complete = req.query.complete === 'true'
    }

    if(req.query.sort){
        const parts = req.query.sort.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    try {
        // const task = await Task.find()
        // const task = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                page,
                limit,
                skip: (page - 1) * limit,
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (error) {
        res.status(400).send()
    }
})

//read task by id

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(400).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

//updates task 

router.patch('/tasks/:id', auth, async (req, res) => {

    const updatesTask = Object.keys(req.body)
    const allowupdateTask = ['desc', 'complete']
    const isValidationTask = updatesTask.every((updateTask) => {
        return allowupdateTask.includes(updateTask)
    })

    if (!isValidationTask) {
        return res.status(400).send({ error: 'invalid updates' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updatesTask.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete task

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router