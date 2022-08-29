const radiography_Service = require('../service/radiography_Service')

class radiographyController {
    create(radiographyInfo){
        return radiography_Service.create(radiographyInfo)
    }

    getByUserId(userInfo){
        return radiography_Service.getByUserId(userInfo)
    }

    delete(radiographyInfo){
        return radiography_Service.delete(radiographyInfo)
    }
}

module.exports = new radiographyController()