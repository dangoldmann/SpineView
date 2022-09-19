const bcrypt = require('bcrypt')
const db = require('../db')
const {validateEmail, checkUserExistance} = require('../scripts/dbFunctions')
const ApiError = require('../error/ApiError')

class userService {
    async getAll() {
        let sql = `select * from user`
        const [users, _] = await db.execute(sql)
        return users
    }

    async create(userInfo, next) {
        try {
            const {name, surname, email, phone, password} = userInfo
        
            const hashedPassword = bcrypt.hashSync(password, 10)

            const isEmailValid = await validateEmail(email)
            if(!isEmailValid) {
                next(ApiError.badRequest('User already exists with that email adress'))
                return 
            }
       
            let sql = `insert into user (name, surname, email, phone, password) values ('${name}', '${surname}', '${email}', '${phone}', '${hashedPassword}')`
            await db.execute(sql)

            const newUser = {
                name,
                surname,
                email,
                phone,
                password: hashedPassword
            }

            return newUser
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async login(userInfo, next){
        try
        {
            const {email, password} = userInfo

            let sql = `select * from user where email = '${email}'`
            const [result, _] = await db.execute(sql)
            const user = result[0]

            if(!user) {
                next(ApiError.badRequest('User not found'))
                return
            }
            
            if(!bcrypt.compareSync(password, user.password)) {
                next(ApiError.badRequest('Invalid password'))
                return
            }

            return user
        }
        catch (err){
            console.log(err.message)
        }
        
    }

    async updatePassword(userInfo, next){
        try
        {
            const {email, newPassword} = userInfo

            const isUser = await checkUserExistance('email', email)
            if(!isUser) {
                next(ApiError.badRequest('User not found'))
                return
            }

            const hashedNewPassword = bcrypt.hashSync(newPassword, 10)

            let sql = `update user set password = '${hashedNewPassword}' where email = '${email}'`
            await db.execute(sql)

            return isUser
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async delete(userInfo, next) {
        try {
            const {email} = userInfo

            const isUser = await checkUserExistance('email', email)
            if(!isUser) {
                next(ApiError.badRequest('User not found'))
                return
            }

            let sql = `delete from user where email = '${email}'`
            await db.execute(sql)

            return true
        }
        catch (err){
            console.error(err.message)
        }
    }
}

module.exports = new userService()
