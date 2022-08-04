const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    connectionLimit: 10
})

//pool.query('select * from osia.usuario', (err, res) => {
  //  return console.log(res)
//})

const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database : "osia"
})

db.connect((err) => {
    if(err)
    {
        throw(err)
    }
    console.log('MySQL connected')
})