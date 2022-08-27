const user_Service = require('../service/user_Service')

class userController {
    getAllUsers(){
        return user_Service.getAllUsers()
    }
    
    createUser(userInfo){
        return user_Service.createUser(userInfo)
    }
    
    login(userInfo){
        return user_Service.login(userInfo)
    }

    updatePassword(userInfo){
        return user_Service.updatePassword(userInfo)
    }

    deleteUser(userInfo){
        return user_Service.deleteUser(userInfo)
    }
}

module.exports = new userController()