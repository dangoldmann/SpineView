const router = require('express').Router()
const userController = require('../controllers/user_Controller')
const ApiError = require('../error/ApiError')
const {isEmailValid} = require('../scripts/emailValidator')

const basePath = '/users'

router.post('/register', async (req, res, next) => {
    const {name, surname, email, phone, password} = req.body
    
    if(!name || !surname || !email || !phone || !password){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }
    
    const {valid, reason, validators} = await isEmailValid(email)

    if(!valid){
        next(ApiError.badRequest(`Please provide a valid email adress, ${validators[reason].reason}`))
        return
    }

    const userInfo = {name, surname, email, phone, password}
    
    const user = await userController.create(userInfo, next)
    
    if(user){
        res.status(201).send({body: {user}})
    }

})

router.post('/login', async (req, res, next) => {
    const {email, password} = req.body
    
    if(!email || !password){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }

    const userInfo = {email, password}

    const user = await userController.login(userInfo, next)

    if(user) {res.send({user: {user}})}
})

router.get('/all', async (req, res) => {
    const users = await userController.getAll()
    res.send({users: {users}})
})

router.put('/password-reset', async (req, res, next) => {
    const {email, newPassword} = req.body
    
    if(!email || !newPassword){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }

    userInfo = {email, newPassword}
    const user = await userController.updatePassword(userInfo, next)
    
    if(user)
    {
        res.send({user: {user}})
    }
})

router.delete('', async (req, res, next) => {
    const {email} = req.body
    
    if(!email){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }
    
    userInfo = {email}
    const user = await userController.delete(userInfo, next)
    
    if(user)
    {
        res.send({user: {user}})
    }
})

module.exports = {router, basePath}
