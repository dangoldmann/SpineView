const router = require('express').Router()
const radiographyController = require('../controllers/radiography_Controller')

const basePath = '/radiographies'

router.post('/add', async (req, res) => {
    const {imageRoute, bodyPart, userId} = req.body
    
    if(!imageRoute || !bodyPart || !userId){
        return res.status(400).send('You must complete all the fields')
    }

    const radiographyInfo = {imageRoute, bodyPart, userId}
    
    const radiography = await radiographyController.create(radiographyInfo)

    res.status(201).send(radiography)
})

router.get('', async (req, res) => {
    const {userId} = req.body
    
    if(!userId){
        return res.status(400).send('You must complete all the fields')
    }
    
    const userInfo = {userId}

    const radiographies = await radiographyController.getByUserId(userInfo)

    res.send(radiographies)
})

router.delete('/delete', async (req, res) => {
    const {imageRoute} = req.body

    if(!imageRoute){
        return res.status(400).send('You must complete all the fields')
    }

    const radiographyInfo = {imageRoute}

    const radiography = await radiographyController.delete(radiographyInfo)

    res.send(radiography)
})

module.exports = { router, basePath }