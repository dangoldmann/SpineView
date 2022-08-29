const user_Service = require('../service/user_Service')

class userController {
    getAll(){
        return user_Service.getAll()
    }
    
    create(userInfo){
        return user_Service.create(userInfo)
    }
    
    login(userInfo){
        return user_Service.login(userInfo)
    }

    updatePassword(userInfo){
        return user_Service.updatePassword(userInfo)
    }

    delete(userInfo){
        return user_Service.delete(userInfo)
    }
}

module.exports = new userController()