const {syncSql} = require('../database')
const {localDatabase, database} = require('../config')

class radiographyService {
    async createRadiography(radiographyInfo) {
        try{
            const {imageRoute, bodyPart, userId} = radiographyInfo
            
            let sql = `select * from user where id = ${userId}`
            var result = syncSql.mysql(database, sql).data.rows
            if(result.length == 0) throw new Error('User not found')

            sql = `select id from body_part where name = '${bodyPart}'`
            var result = syncSql.mysql(database, sql).data.rows
            if(result.length == 0) throw new Error('Body part not valid')
            const bodyPartId = result[0].id
            
            sql = `insert into radiography (image_route, id_body_part, id_user) values ('${imageRoute}', ${bodyPartId}, ${userId})`
            var _ = syncSql.mysql(database, sql)

            const newRadiography = {
                imageRoute,
                bodyPartId,
                userId
            }

            return newRadiography
        }
        catch(err){
            console.log(err.message)
        }
    }

    async getRadiographies(userInfo){
        try{
            const {userId} = userInfo

            let sql = `select * from user where id = ${userId}`
            var result = syncSql.mysql(database, sql).data.rows
            if(result.length == 0) throw new Error('User not found')

            sql = `select image_route from radiography where id_user = ${userId}`
            const imageRoutes = syncSql.mysql(database, sql).data.rows

            return imageRoutes
        }
        catch(err){
            console.log(err.message)
        }
    }

    async deleteRadiography(radiographyInfo){
        try{
            const {imageRoute} = radiographyInfo

            let sql = `select * from radiography where image_route = '${imageRoute}'`
            var result = syncSql.mysql(database, sql).data.rows
            if(result.length == 0) throw new Error('Image not found')

            sql = `delete from radiography where image_route = '${imageRoute}'`
            var _ = syncSql.mysql(database, sql)

            return result
        }
        catch(err){
            console.log(err.message)
        }
    }
}

module.exports = new radiographyService()