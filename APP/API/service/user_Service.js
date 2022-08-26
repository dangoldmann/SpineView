const bcrypt = require('bcrypt')
const db = require('../database')

class userService {
    async getAll() {
        let sql = `select * from user`
        db.query(sql, (err, result) => {
        if(err) throw err
            return result
        })
    }

    async createUser(userInfo) {
        const {name, surname, email, phone, password} = userInfo

        const hashedPassword = bcrypt.hashSync(password, 10)

        let sql = `select * from user where email = '${email}'`
        db.query(sql, (err, result) => {
            if(err) throw err
            if(result.length > 0) throw new Error('User already exists with that email adress')
        })

        sql = `insert into user (name, surname, email, phone, password) values ('${name}', '${surname}', '${email}', '${phone}', '${hashedPassword}')`
        db.query(sql, (err) => {
            if(err) throw err
        })

        const newUser = {
            name,
            surname,
            email,
            phone,
            password: hashedPassword
        }

        return newUser
    }

    async updatePassword(userInfo){
        const {email, newPassword} = userInfo

        let sql = `select * from user where email = '${email}'`
        db.query(sql, (err, result) => {
            if(err) throw err
            if(result.length == 0) throw new Error('User not found')
        })

        const hashedNewPassword = bcrypt.hashSync(newPassword, 10)

        sql = `update user set password = '${hashedNewPassword}' where email = '${email}'`
        db.query(sql, (err) => {
            if(err) throw err
        })
    }

    async deleteUser(userInfo) {
        const {email} = userInfo

        let sql = `select * from user where email = '${email}'`
        db.query(sql, (err, result) => {
            if(err) throw err
            if(result.length == 0) throw new Error('User not found')
        })

        sql = `delete from user where email = '${email}'`
        db.query(sql, (err) => {
            if(err) throw err
        })
    }
}
