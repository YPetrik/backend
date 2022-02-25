const router = require('express').Router()
const dataRouter = require('./dataRouter')

router.use('/data', dataRouter)

module.exports = router
