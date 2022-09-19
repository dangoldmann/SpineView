const router = require('express').Router()
const radiographyController = require('../controllers/radiography_Controller')
const ApiError = require('../error/ApiError')

const basePath = '/radiographies'

router.post('/add', async (req, res, next) => {
    const {imageRoute, bodyPart, userId} = req.body
    
    if(!imageRoute || !bodyPart || !userId){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }

    const radiographyInfo = {imageRoute, bodyPart, userId}
    
    const radiography = await radiographyController.create(radiographyInfo, next)

    if(radiography){
        res.status(201).send({body: {radiography}})
    }
    
})

router.get('', async (req, res, next) => {
    const {userId} = req.body
    
    if(!userId){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }
    
    const userInfo = {userId}

    const imageRoutes = await radiographyController.getByUserId(userInfo, next)

    if(imageRoutes){
        res.send({body: {imageRoutes}})
    }
})

router.delete('/delete', async (req, res, next) => {
    const {imageRoute} = req.body

    if(!imageRoute){
        next(ApiError.badRequest('You must complete all the fields'))
        return
    }

    const radiographyInfo = {imageRoute}

    const isDeleted = await radiographyController.delete(radiographyInfo, next)

    if(isDeleted){
        res.send({body: {isDeleted}})
    }
})

module.exports = { router, basePath }