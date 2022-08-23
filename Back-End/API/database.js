const {localDatabase, database} = require.main.require('./config.js')
const mysql = require('mysql')
const syncSql = require('sync-sql')
const db = mysql.createConnection(database) 

db.connect((err) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has to many connections");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused");
        }
    }

    return 
})

module.exports = {db, syncSql}