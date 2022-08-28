const router = require('express').Router()
const radiographyController = require('../controllers/radiography_Controller')

const basePath = '/radiography'

router.post('/add', async (req, res) => {
    const {imageRoute, bodyPart, userId} = req.body
    const radiographyInfo = {imageRoute, bodyPart, userId}
    
    const radiography = await radiographyController.createRadiography(radiographyInfo)

    res.send(radiography)
})

router.get('', async (req, res) => {
    const {userId} = req.body
    const userInfo = {userId}

    const radiographies = await radiographyController.getRadiographies(userInfo)

    res.send(radiographies)
})

router.delete('/delete', async (req, res) => {
    const {imageRoute} = req.body
    const radiographyInfo = {imageRoute}

    const radiography = await radiographyController.deleteRadiography(radiographyInfo)

    res.send(radiography)
})

module.exports = { router, basePath }