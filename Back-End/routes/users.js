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

db.connect((err) => {
    if (err) {
        throw (err)
    }
    console.log('MySQL Connected...')
})

router.get('/', (req, res) => {
    let sql = 'select * from usuario'
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    let sql = `select * from usuario where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err

        if (result.length != 0) res.send(result)
        else res.status(404).send('User not found')
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body

    let sql = `update usuario set nombre = '${name}' where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err

        if (result.affectedRows != 0) res.send('User updated successfully')
        else res.status(404).send('User not found')

    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    let sql = `delete from usuario where id = ${id}`
    db.query(sql, (err, result) => {
        if (err) throw err

        if (result.affectedRows != 0) res.send('The user has been deleted successfully')
        else res.status(404).send('User not found')

    })
})

router.post('/register', async (req, res) => {
    const { name, surname, email, phone, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        let sql = `insert into usuario (nombre, apellido, email, telefono, contraseña) values ('${name}', '${surname}', '${email}', '${phone}', '${hashedPassword}')`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.status(201).send('User created correctly')
        })
    }
    catch { res.status(500).send() }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    
    let sql = `select * from usuario where email = '${email}'`
    db.query(sql, async (err, result) => {
        if (err) throw err

        let hashedPassword

        if (result.length != 0) 
        {
            hashedPassword = result[0].contraseña
        }
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