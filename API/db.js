require('dotenv').config()
const mysql = require('mysql2')

const localhostPool = mysql.createPool({
    host : process.env.LOCAL_HOST,
    user : process.env.LOCAL_USER,
    password : process.env.LOCAL_PASSWORD,
    database : process.env.LOCAL_NAME
})

const connection = mysql.createConnection(process.env.DB_URL)

//module.exports = localhostPool.promise()
module.exports = connection.promise()