const Task = require('../models/task')
const express = require('express')
const router = new express.Router()

const createdStatusCode = 201
const badRequestStatusCode = 400
const notFoundStatusCode = 404
const serverErrorStatusCode = 500


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(createdStatusCode).send(task)
    }catch(e){
        res.status(badRequestStatusCode).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        return res.send(tasks)
    }catch(e){
        res.status(serverErrorStatusCode).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)        
        if(!task){
            return res.status(notFoundStatusCode).send()
        }
        res.send(task)
    }catch(e){
        res.status(serverErrorStatusCode).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(badRequestStatusCode).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if(!task){
            return res.status(notFoundStatusCode).send()
        }
        res.send(task)
    } catch (error) {
        res.status(badRequestStatusCode).send(error)
    }
})


router.delete('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(notFoundStatusCode).send()
        }
        res.send(task)
    }catch(error){
        res.status(serverErrorStatusCode).send()
    }
})


module.exports = router