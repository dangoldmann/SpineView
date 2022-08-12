const {Router} = require('express')
const router = Router()
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

router.post('/add-image', (req, res) => {
    const {image, bodyPart, userId} = req.body
    const isUser = checkUserExistanceByID(userId) 
    
    if(isUser)
    {
        const bodyPartID = getBodyPartIDByName(bodyPart)

        if(bodyPartID != -1)
        {
            let sql = `insert into radiografia (imagen, id_parte_cuerpo, id_usuario) values ('${image}', ${bodyPartID}, ${userId})`
            db.query(sql, (err, result) => {
                if(err) throw err 
        
                res.send('Image added successfully')
            })
        }
        else res.send('Body part not valid')
    }
    else res.status(404).send('User not found')
})

router.get('/:idUsuario', (req, res) => {
    const {idUsuario} = req.params
    const isUser = checkUserExistanceByID(idUsuario)

    if(isUser)
    {
        let sql = `select imagen from radiografia where id_usuario = ${idUsuario}`
        db.query(sql, (err, result) => {
            if(err) throw err

            res.send(result)
        })
    }
    else res.status(404).send('User not found')
})  

router.delete('/delete-image', (req, res) => {
    const {image} = req.body
    const isImage = checkImageExistance(image)
    
    if(isImage)
    {
        let sql = `delete from radiografia where imagen = '${image}'`
        db.query(sql, (err, result) => {
            if(err) throw err

            res.send('Image deleted successfullly')
        })
    }
    else res.status(404).send('Image not found')
    
})

function checkUserExistanceByID(id)
{
    let sql = `select * from usuario where id = ${id}`
    var output = syncSql.mysql(config, sql)

    return output.data.rows.length != 0
}

function getBodyPartIDByName(name)
{
    let sql = `select id from parte_cuerpo where nombre = '${name}'`
    var output = syncSql.mysql(config, sql)
    
    try { return output.data.rows[0].id }
    catch { return -1}
}

function checkImageExistance(image)
{
    let sql = `select * from radiografia where imagen = '${image}'`
    var output = syncSql.mysql(config, sql)

    return output.data.rows.length != 0
}

module.exports = router