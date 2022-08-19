const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "osia"
}) 

const syncSql = require('sync-sql')
var config = {
    host : "localhost",
    user : "root",
    password : "rootroot",
    database : "osia"
}


db.connect((err) => {
    if (err) throw (err)
})

router.get('/get-all', (req, res) => {
    let sql = 'select * from user'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    let sql = `select * from user where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err

        if (result.length != 0) res.send(result)
        else res.status(404).send('User not found')
    })
})

router.put('/name-reset/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    let sql = `update user set name = '${name}' where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err

        if (result.affectedRows != 0) res.send('User updated successfully')
        else res.status(404).send('User not found')

    })
})

router.put('/password-reset', async (req, res) => {
    const {email, password} = req.body

    if(email && password)
    {
        const IsUser = checkUserExistance(email)

        if(IsUser)
        {
            const hashedPassword = await bcrypt.hash(password, 10)
            let sql = `update user set password = '${hashedPassword}'`

            db.query(sql, (err, result) => {
                if(err) throw err

                res.send('User updated successfully')
            })
        }
        else res.status(404).send('User not found')
    }
    else res.status(400).send('You must complete all the fields')
    
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    let sql = `delete from user where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err

        if (result.affectedRows != 0) res.send('The user has been deleted successfully')
        else res.status(404).send('User not found')

    })
})

router.post('/register', async (req, res) => {
    const { name, surname, email, phone, password } = req.body
    if(name && surname && email && phone && password)
    {
        const isEmailValid = validateEmail(email)

        if(isEmailValid)
        {
            try 
            {
                const hashedPassword = await bcrypt.hash(password, 10)

                let sql = `insert into user (name, surname, email, phone, password) values ('${name}', '${surname}', '${email}', '${phone}', '${hashedPassword}')`
                db.query(sql, (err, result) => {
                    if (err) throw err
                    res.status(201).send('User created correctly')
                })
            }
            catch { res.status(500).send() }
        }
        else res.send('An account already exists with that email address')
    }   
    else res.status(400).send('You must complete all the fields') 
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    let sql = `select password from user where email = '${email}'`
    db.query(sql, async (err, result) => {
        if(err) throw err

        let hashedPassword 

        if(result.length != 0) hashedPassword = result[0].password
        else return res.status(404).send('User not found')
        
        try 
        {
            if (await bcrypt.compare(password, hashedPassword)) {
                res.send('Success')
            }
            else {
                res.send('Incorrect password')
            }
        }
        catch { res.status(500).send() }
    })
})

module.exports = router

function validateEmail(email)
{
    let sql = `select * from user where email = '${email}'`
    var output = syncSql.mysql(config, sql)

    return output.data.rows.length == 0
}

function checkUserExistance(email)
{
    let sql = `select * from user where email = '${email}'`
    var output = syncSql.mysql(config, sql)

    return output.data.rows.length != 0
}