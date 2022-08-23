//#region dependencies
const {Router} = require('express')
const router = Router()
const {db, syncSql} = require.main.require('./database.js')
const {localDatabase, database} = require.main.require('./config.js')
//#endregion

//#region endpoints
router.post('/add-image', (req, res) => {
    const {image, bodyPart, userId} = req.body
    const isUser = checkUserExistanceByID(userId) 
    
    if(isUser)
    {
        const bodyPartID = getBodyPartIDByName(bodyPart)

        if(bodyPartID != -1)
        {
            let sql = `insert into radiography (image_route, id_body_part, id_user) values ('${image}', ${bodyPartID}, ${userId})`
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
        let sql = `select image_route from radiography where id_user = ${idUsuario}`
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
        let sql = `delete from radiography where image_route = '${image}'`
        db.query(sql, (err, result) => {
            if(err) throw err

            res.send('Image deleted successfullly')
        })
    }
    else res.status(404).send('Image not found')
    
})
//#endregion

//#region functions
function checkUserExistanceByID(id)
{
    let sql = `select * from user where id = ${id}`
    var output = syncSql.mysql(database, sql)

    return output.data.rows.length != 0
}

function getBodyPartIDByName(name)
{
    let sql = `select id from body_part where name = '${name}'`
    var output = syncSql.mysql(database, sql)
    
    try { return output.data.rows[0].id }
    catch { return -1}
}

function checkImageExistance(image)
{
    let sql = `select * from radiography where image_route = '${image}'`
    var output = syncSql.mysql(database, sql)

    return output.data.rows.length != 0
}
//#endregion

module.exports = router