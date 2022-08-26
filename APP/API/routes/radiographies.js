//#region dependencies
const {Router} = require('express')
const router = Router()
const {db} = require.main.require('./database.js')
const {checkUserExistanceByID, getBodyPartIDByName, checkImageExistance} = require.main.require('./usefulFunctions.js')
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
    const {image_route} = req.body
    const isImage = checkImageExistance(image_route)
    
    if(isImage)
    {
        let sql = `delete from radiography where image_route = '${image_route}'`
        db.query(sql, (err) => {
            if(err) throw err

            res.send('Image deleted successfullly')
        })
    }
    else res.status(404).send('Image not found')
    
})
//#endregion

module.exports = router