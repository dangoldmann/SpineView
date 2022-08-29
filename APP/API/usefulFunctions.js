const db = require('./db')

async function validateEmail(email){
    let sql = `select * from user where email = '${email}'`
    var [result, _] = await db.execute(sql)

    return result.length == 0
}

async function checkUserExistance(field, value)
{
    let sql = `select * from user where ${field} = '${value}'`
    var [result, _] = await db.execute(sql)
    
    return result.length != 0
}

async function getBodyPartId(name)
{
    let sql = `select id from body_part where name = '${name}'`
    var [result, _] = await db.execute(sql)
    
    try { return result[0].id }
    catch { return -1}
}

async function checkImageExistance(imageRoute)
{
    let sql = `select * from radiography where image_route = '${imageRoute}'`
    var [result, _] = await db.execute(sql)

    return result.length != 0
}

module.exports = {validateEmail, checkUserExistance, getBodyPartId, checkImageExistance}