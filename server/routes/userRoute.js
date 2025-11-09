const express = require('express')
const router = express.Router();
const {createFolder,getUser}=require('../controllers/userController')
const {authenticateToken}=require('../middleware/authenticateToken')

router.post('/createFolder',authenticateToken,createFolder)
router.get('/user',authenticateToken,getUser)

module.exports=router