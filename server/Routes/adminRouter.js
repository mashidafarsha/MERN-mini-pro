const express = require('express')
const router = express.Router()
const{adminLogin,getUserList,deleteUser,editUser,addUser}=require('../Controller/adminController')
const {verifyAdmin}=require('../Middilewares/adminAuth')
// router.get('/',verifyAdmin)
router.post('/admin-login',adminLogin)
router.get('/user-list',getUserList)
router.delete('/delete-user/:userId',deleteUser)
router.put('/edit-user', editUser);
router.post('/add-user',verifyAdmin,addUser)

module.exports= router