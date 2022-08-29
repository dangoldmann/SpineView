const router = require('express').Router()
const basePath = '/data'

router.post('', (req, res) => {
    res.send('Hola')
})

module.exports = {router, basePath}
