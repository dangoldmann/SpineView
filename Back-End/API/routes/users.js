//#region dependencies
const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {db, syncSql} = require.main.require('./database.js')
const {localDatabase, database} = require.main.require('./config.js')
//#endregion

//#region endpoints
router.post('/register', async (req, res) => {
    const { name, surname, email, phone, password } = req.body
    
    if(name && surname && email && phone && password)
    {
        if(validateEmail(email))
        {
            try 
            {
                const hashedPassword = await bcrypt.hash(password, 10)

                let sql = `insert into user (name, surname, email, phone, password) values ('${name}', '${surname}', '${email}', '${phone}', '${hashedPassword}')`
                db.query(sql, (err) => {
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

    if(email && password)
    {
        if(checkUserExistance(email))
        {
            let sql = `select password from user where email = '${email}'`
            db.query(sql, async (err, result) => {
                if(err) throw err

                let hashedPassword = result[0].password
        
                try 
                {
                    if (await bcrypt.compare(password, hashedPassword)) 
                    {
                        res.send('Authorized')
                    }
                    else res.sendStatus(401)
                }
                catch { res.status(500).send() }
            })
        }
        else res.status(404).send('User not found')
    }
    else res.status(400).send('You must complete all the fields')
})

router.get('/all', (req, res) => {
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

router.put('/name-reset', (req, res) => {
    const { email, name } = req.body

    if(name)
    {
        if(checkUserExistance(email))
        {
            let sql = `update user set name = '${name}' where email = '${email}'`
            db.query(sql, (err) => {
                if (err) throw err

                res.send('User updated successfully')
            })
        }
        else res.status(404).send('User not found')
    }
    else res.status(400).send('You must complete all the fields')
    
})

router.put('/password-reset', async (req, res) => {
    const {email, password} = req.body

    if(email && password)
    {
        if(checkUserExistance(email))
        {
            const hashedPassword = await bcrypt.hash(password, 10)
            let sql = `update user set password = '${hashedPassword}'`

            db.query(sql, (err) => {
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

    if(checkUserExistanceByID(id))
    {
        let sql = `delete from user where id = ${id}`
        db.query(sql, (err) => {
            if (err) throw err

            res.send('The user has been deleted successfully')
        })
    }
    else res.status(404).send('User not found')
})
//#endregion

//#region functions
function validateEmail(email)
{
    let sql = `select * from user where email = '${email}'`
    var output = syncSql.mysql(database, sql)
    
    return output.data.rows.length == 0
}

function checkUserExistance(email)
{
    let sql = `select * from user where email = '${email}'`
    var output = syncSql.mysql(database, sql)
    
    return output.data.rows.length != 0
}

function checkUserExistanceByID(id)
{
    let sql = `select * from user where id = ${id}`
    var output = syncSql.mysql(database, sql)

    return output.data.rows.length != 0
}

// Authorization: Bearer <token>
function verifyToken(req, res, next)
{
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined')
    {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }
    else res.sendStatus(403)
}
//#endregion

module.exports = router