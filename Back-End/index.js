const express = require('express');
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database : "osia"
})

app.use(express.json())

db.connect((err) => {
    if(err)
    {
        throw(err)
    }
    console.log('MySQL Connected...')
})

app.get('/api/users', (req, res) => {
    let sql = 'select * from usuario'
    db.query(sql, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

app.get('/api/users/:id', (req, res) => {
    const {id} = req.params
    let sql = `select * from usuario where id = ${id}`
    db.query(sql, (err, result) => {
        if(err) throw err
        
        if(result.length != 0) res.send(result)
        else res.status(404).send('User not found')
    })
})

app.post('/api/users', (req, res) => {
    const {name, surname, email, phone, password} = req.body
    
    let sql = `insert into usuario (nombre, apellido, email, telefono, contraseña) values ('${name}', '${surname}', '${email}', '${phone}', '${password}')`
    db.query(sql, (err, result) => {
        if(err) throw err
        res.status(201).send('User created correctly')
    })
})

app.put('/api/users/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body

    let sql = `update usuario set nombre = '${name}' where id = ${id}`
    db.query(sql, (err, result) => {
        if(err) throw err

        if(result.affectedRows != 0) res.send('User updated successfully')
        else res.status(404).send('User not found')
        
    })
})

app.delete('/api/users/:id', (req, res) => {
    const {id} = req.params

    let sql = `delete from usuario where id = ${id}`
    db.query(sql, (err, result) => {
        if(err) throw err
        
        if (result.affectedRows != 0) res.send('The user has been deleted successfully')
        else res.status(404).send('User not found')
        
    })
})

const userLogin = []

app.get('/api/usersLogin', (req, res) => {
    res.json(userLogin)
})

app.post('/api/usersLogin', async (req, res) => {
    try
    {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        userLogin.push(user)
        res.status(201).send()
    }
    catch
    {
        res.status(500).send()
    }
})

app.post('/api/usersLogin/login', async (req, res) => {
    const user = userLogin.find(user => user.name == req.body.name)
    
    if(!user) return res.status(400).send('Cannot find user')
    
    try
    {
        if(await bcrypt.compare(req.body.password, user.password))
        {
            res.send('Success')
        }
        else
        {
            res.send('Not allowed')
        }
    }
    catch
    {
        res.status(500).send()
    }
})

app.listen(3000, () => console.log(`Listening on port 3000...`))
