const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

const createdStatusCode = 201
const badRequestStatusCode = 400
const notFoundStatusCode = 404
const serverErrorStatusCode = 500

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(createdStatusCode).send( {user, token} )
    } catch(e) {
        res.status(badRequestStatusCode).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send( {user, token} ) 
    } catch (error) {
        res.status(badRequestStatusCode).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(notFoundStatusCode).send()
        }
        res.send(user)
    } catch (e) {
        res.status(serverErrorStatusCode).send()
    }    
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(badRequestStatusCode).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        
        if(!user){
            return res.status(notFoundStatusCode).send()
        }
        res.send(user)
    } catch (error) {
        res.status(badRequestStatusCode).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(notFoundStatusCode).send()
        }
        res.send(user)
    }catch(error){
        res.status(serverErrorStatusCode).send()
    }
})

module.exports = router