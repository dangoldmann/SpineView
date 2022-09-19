const radiography_Service = require('../service/radiography_Service')

class radiographyController {
    create(radiographyInfo, next){
        return radiography_Service.create(radiographyInfo, next)
    }

    getByUserId(userInfo, next){
        return radiography_Service.getByUserId(userInfo, next)
    }

    delete(radiographyInfo, next){
        return radiography_Service.delete(radiographyInfo, next)
    }
}

module.exports = new radiographyController()