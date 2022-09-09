const router = require('express').Router()
const userController = require('../controllers/user_Controller')
const {isEmailValid} = require('../emailValidator')
const { validateEmail } = require('../scripts/dbFunctions')

const basePath = '/users'

router.post('/register', async (req, res) => {
    const {name, surname, email, phone, password} = req.body
    
    if(!name || !surname || !email || !phone || !password){
        return res.status(400).send('You must complete all the fields')
    }
    
    const {valid, reason, validators} = await isEmailValid(email)

    if(!valid) return res.status(400).send({
        message: 'Please provide a valid email adress',
        reason: validators[reason].reason
    })

    const userInfo = {name, surname, email, phone, password}
    
    const user = await userController.create(userInfo)

    if(user){
        req.session.user = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            password: user.password
        }
        res.status(201).send(user)
    }

    
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password){
        return res.status(400).send('You must complete all the fields')
    }

    const userInfo = {email, password}

    const user = await userController.login(userInfo)

    if(user){
        req.session.user = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            password: user.password
        }
    }

    res.send(user)
})

router.get('/all', async (req, res) => {
    const users = await userController.getAll()
    res.send(users)
})

router.put('/password-reset', async (req, res) => {
    const {email, newPassword} = req.body
    
    if(!email || !newPassword){
        return res.status(400).send('You must complete all the fields')
    }

    userInfo = {email, newPassword}
    //userInfo.email = req.session.user.email
    const user = await userController.updatePassword(userInfo)
    res.send(user)
})

router.delete('', async (req, res) => {
    const {email} = req.body
    
    if(!email){
        return res.status(400).send('You must complete all the fields')
    }
    
    userInfo = {email}
    //userInfo.email = req.session.user.email
    const user = await userController.delete(userInfo)
    req.session.destroy()
    res.json(user)
})

module.exports = {router, basePath}
