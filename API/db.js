require('dotenv').config()
const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}) // RAILWAY CONNECTION

const connection = mysql.createConnection(process.env.DB_URL) // PLANET SCALE CONNECTION

module.exports = connection.promise()