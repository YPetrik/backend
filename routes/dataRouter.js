const router = require('express').Router()
const DataController = require('../controllers/dataController')
router.post('/push', DataController.createData )
router.post('/update', DataController.updateData )
router.get('/:shareCode', DataController.getData )
router.post('/delete', DataController.deleteData )
router.post('/clear/:code', DataController.deleteAllData )

module.exports = router
