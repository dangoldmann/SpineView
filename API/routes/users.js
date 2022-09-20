const router = require('express').Router()
const userController = require('../controllers/user_Controller')
const ApiError = require('../error/ApiError')
const {makeDeepValidation, makeSimpleValidation} = require('../scripts/emailValidator')

const basePath = '/users'

router.post('/register', async (req, res, next) => {
    const {name, surname, email, phone, password} = req.body
    
    if(!name || !surname || !email || !phone || !password){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }

    //const {valid, reason, validators} = await makeDeepValidation(email) // deep email validation
    
    const valid = await makeSimpleValidation(email) // simple email validation

    if(!valid){
        next(ApiError.badRequest('Please provide a valid email adress'))
        //next(ApiError.badRequest(`Please provide a valid email adress, ${validators[reason].reason}`))
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

    if(user) {res.send({body: {user}})}
})

router.get('/all', async (req, res) => {
    const users = await userController.getAll()
    res.send({body: {users}})
})

router.put('/password-reset', async (req, res, next) => {
    const {email, newPassword} = req.body
    
    if(!email || !newPassword){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }

    userInfo = {email, newPassword}
    const passwordReset = await userController.updatePassword(userInfo, next)
    
    if(passwordReset)
    {
        res.send({body: {passwordReset}})
    }
})

router.delete('', async (req, res, next) => {
    const {email} = req.body
    
    if(!email){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }
    
    userInfo = {email}
    const isDeleted = await userController.delete(userInfo, next)
    
    if(isDeleted)
    {
        res.send({body: {isDeleted}})
    }
})

module.exports = {router, basePath}
