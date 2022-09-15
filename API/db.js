require('dotenv').config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
})

const locahostPool = mysql.createPool({
    host : process.env.LOCAL_HOST,
    user : process.env.LOCAL_USER,
    password : process.env.LOCAL_PASSWORD,
    database : process.env.LOCAL_NAME
})

module.exports = locahostPool.promise()