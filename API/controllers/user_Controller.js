const user_Service = require('../service/user_Service')

class userController {
    getAll(){
        return user_Service.getAll()
    }
    
    create(userInfo, next){
        return user_Service.create(userInfo, next)
    }
    
    login(userInfo, next){
        return user_Service.login(userInfo, next)
    }

    updatePassword(userInfo, next){
        return user_Service.updatePassword(userInfo, next)
    }

    delete(userInfo, next){
        return user_Service.delete(userInfo, next)
    }
}

module.exports = new userController()