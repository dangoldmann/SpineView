const bcrypt = require('bcrypt')
const db = require('../db')
const {validateEmail, checkUserExistance} = require('../scripts/dbFunctions')

class userService {
    async getAll() {
        let sql = `select * from user`
        const [users, _] = await db.execute(sql)
        return users
    }

    async create(userInfo) {
        try {
            const {name, surname, email, phone, password} = userInfo
        
            const hashedPassword = bcrypt.hashSync(password, 10)

            const isEmailValid = await validateEmail(email)
            if(!isEmailValid) return new Error('User already exists with that email adress')
       
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

    async login(userInfo){
        try
        {
            const {email, password} = userInfo

            let sql = `select * from user where email = '${email}'`
            const [result, _] = await db.execute(sql)
            const user = result[0]

            if(!user) throw new Error('User not found')
            
            if(!bcrypt.compareSync(password, user.password)) {
                throw new Error('Invalid password')
            }

            return user
        }
        catch (err){
            console.log(err.message)
        }
        
    }

    async updatePassword(userInfo){
        try
        {
            const {email, newPassword} = userInfo

            const isUser = await checkUserExistance('email', email)
            if(!isUser) throw new Error('User not found')

            const hashedNewPassword = bcrypt.hashSync(newPassword, 10)

            let sql = `update user set password = '${hashedNewPassword}' where email = '${email}'`
            await db.execute(sql)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async delete(userInfo) {
        try {
            const {email} = userInfo

            const isUser = await checkUserExistance('email', email)
            if(!isUser) throw new Error('User not found')

            let sql = `delete from user where email = '${email}'`
            await db.execute(sql)
        }
        catch (err){
            console.error(err.message)
        }
    }
}

module.exports = new userService()
