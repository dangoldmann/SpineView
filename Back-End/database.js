const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    connectionLimit: 10
})

pool.query('select * from osia.usuario', (err, res) => {
    return console.log(res)
})

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
    console.log('MySQL Connected...')
})

app.get('/api/users', (req, res) => {
    let sql = 'select * from usuarios'
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
    })
})

//app.listen(3000, () => console.log(`Listening on port 3000...`))