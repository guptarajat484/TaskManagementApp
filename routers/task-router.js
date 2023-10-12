const express = require('express')
const router = express.Router()
const {addvalidation,deletevalidation,updatevalidation} = require('../middlewares/task-module-validation')
const {viewtask,deletetask,updatetask,addtask} = require('../controllers/task-controller')
const validateJWT = require('../middlewares/validate-jwt-token')


router.post('/task/add',[validateJWT,addvalidation],addtask)

router.get('/task/view',validateJWT,viewtask)

router.put('/task/update/:id',validateJWT,updatevalidation,updatetask)

router.delete('/task/delete/:id',validateJWT,deletetask)

module.exports = router