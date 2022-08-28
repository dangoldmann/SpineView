const router = require('express').Router()
const userController = require('../controllers/user_Controller')

const basePath = '/users'

router.post('/register', async (req, res) => {
    const {name, surname, email, phone, password} = req.body
    const userInfo = {name, surname, email, phone, password}
    
    const user = await userController.createUser(userInfo)

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

router.post('/login', async (req, res) => {
    const {email, password} = req.body
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
    const users = await userController.getAllUsers()
    res.send(users)
})

router.put('/password-reset', async (req, res) => {
    const {email, newPassword} = req.body
    userInfo = {email, newPassword}
    //userInfo.email = req.session.user.email
    const user = await userController.updatePassword(userInfo)
    res.send(user)
})

router.delete('', async (req, res) => {
    const {email} = req.body
    userInfo = {email}
    //userInfo.email = req.session.user.email
    const user = await userController.deleteUser(userInfo)
    req.session.destroy()
    res.json(user)
})

module.exports = {router, basePath}
