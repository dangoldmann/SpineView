//#region dependencies
const {syncSql} = require.main.require('./database.js')
const {localDatabase, database} = require.main.require('./config.js')
//#endregion

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

module.exports = {validateEmail, checkUserExistance, checkUserExistanceByID, getBodyPartIDByName, checkImageExistance}