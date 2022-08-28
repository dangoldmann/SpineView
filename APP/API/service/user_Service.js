const bcrypt = require('bcrypt')
const {syncSql} = require('../database')
const {localDatabase, database} = require('../config')

class userService {
    async getAllUsers(userInfo) {
        let sql = `select * from user`
        return syncSql.mysql(database, sql).data.rows
    }

    async createUser(userInfo) {
        try {
            const {name, surname, email, phone, password} = userInfo
        
            const hashedPassword = bcrypt.hashSync(password, 10)

            let sql = `select * from user where email = '${email}'`
            var result = syncSql.mysql(database, sql).data.rows
            if(result.length > 0) throw new Error('User already exists with that email adress')

            sql = `insert into user (name, surname, email, phone, password) values ('${name}', '${surname}', '${email}', '${phone}', '${hashedPassword}')`
            var _ = syncSql.mysql(database, sql)

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
            const user = syncSql.mysql(database, sql).data.rows[0]
            
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

            let sql = `select * from user where email = '${email}'`
            var result = syncSql.mysql(database, sql)
            if(result.data.rows.length == 0) throw new Error('User not found')

            const hashedNewPassword = bcrypt.hashSync(newPassword, 10)

            sql = `update user set password = '${hashedNewPassword}' where email = '${email}'`
            var _ = syncSql.mysql(database, sql)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async deleteUser(userInfo) {
        try {
            const {email} = userInfo

            let sql = `select * from user where email = '${email}'`
            var result = syncSql.mysql(database, sql)
            if(result.data.rows.length == 0) throw new Error('User not found')

            sql = `delete from user where email = '${email}'`
            var _ = syncSql.mysql(database, sql)
        }
        catch (err){
            console.error(err.message)
        }
    }
}

module.exports = new userService()
