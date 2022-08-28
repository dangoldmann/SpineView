const radiography_Service = require('../service/radiography_Service')

class radiographyController {
    createRadiography(radiographyInfo){
        return radiography_Service.createRadiography(radiographyInfo)
    }

    getRadiographies(userInfo){
        return radiography_Service.getRadiographies(userInfo)
    }

    deleteRadiography(radiographyInfo){
        return radiography_Service.deleteRadiography(radiographyInfo)
    }
}

module.exports = new radiographyController()